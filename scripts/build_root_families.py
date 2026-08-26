#!/usr/bin/env python3
"""Generate root-family app data from Cleaned_Root_letters.xlsx.

Uses only the Python standard library so the source workbook remains a
development input and no spreadsheet parser is shipped in the mobile app.
"""

from __future__ import annotations

import json
import re
import zipfile
from collections import OrderedDict, defaultdict
from pathlib import Path
from xml.etree import ElementTree


PROJECT_ROOT = Path(__file__).resolve().parent.parent
SOURCE_PATH = PROJECT_ROOT / "references" / "Cleaned_Root_letters.xlsx"
TRANSLATION_SOURCE_PATH = PROJECT_ROOT / "references" / "QuranRootLetters.xlsx"
OUTPUT_PATH = PROJECT_ROOT / "src" / "data" / "rootFamilies.generated.json"
EXPECTED_HEADERS = ("ID", "ARABIC", "Transliteration", "Root_Letters")
PREFERRED_FIRST_ROOT = "ا م ن"

SPREADSHEET_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
RELATIONSHIP_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PACKAGE_RELATIONSHIP_NS = "http://schemas.openxmlformats.org/package/2006/relationships"


def column_index(cell_reference: str) -> int:
    letters = re.match(r"[A-Z]+", cell_reference)
    if not letters:
        raise ValueError(f"Invalid cell reference: {cell_reference}")

    index = 0
    for character in letters.group(0):
        index = index * 26 + ord(character) - ord("A") + 1
    return index - 1


def read_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    path = "xl/sharedStrings.xml"
    if path not in archive.namelist():
        return []

    root = ElementTree.fromstring(archive.read(path))
    values: list[str] = []
    for item in root.findall(f"{{{SPREADSHEET_NS}}}si"):
        values.append(
            "".join(
                node.text or ""
                for node in item.iter(f"{{{SPREADSHEET_NS}}}t")
            )
        )
    return values


def first_worksheet_path(archive: zipfile.ZipFile) -> str:
    workbook = ElementTree.fromstring(archive.read("xl/workbook.xml"))
    first_sheet = workbook.find(
        f"{{{SPREADSHEET_NS}}}sheets/{{{SPREADSHEET_NS}}}sheet"
    )
    if first_sheet is None:
        raise ValueError("Workbook has no worksheets")

    relationship_id = first_sheet.attrib[f"{{{RELATIONSHIP_NS}}}id"]
    relationships = ElementTree.fromstring(
        archive.read("xl/_rels/workbook.xml.rels")
    )
    for relationship in relationships:
        if relationship.attrib.get("Id") == relationship_id:
            target = relationship.attrib["Target"].lstrip("/")
            return target if target.startswith("xl/") else f"xl/{target}"

    raise ValueError("Could not resolve the first worksheet")


def cell_value(cell: ElementTree.Element, shared_strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return "".join(
            node.text or ""
            for node in cell.iter(f"{{{SPREADSHEET_NS}}}t")
        )

    value = cell.find(f"{{{SPREADSHEET_NS}}}v")
    if value is None or value.text is None:
        return ""
    if cell_type == "s":
        return shared_strings[int(value.text)]
    return value.text


def worksheet_rows(path: Path):
    with zipfile.ZipFile(path) as archive:
        shared_strings = read_shared_strings(archive)
        worksheet_path = first_worksheet_path(archive)
        with archive.open(worksheet_path) as stream:
            for _, element in ElementTree.iterparse(stream, events=("end",)):
                if element.tag != f"{{{SPREADSHEET_NS}}}row":
                    continue

                cells: dict[int, str] = {}
                for cell in element.findall(f"{{{SPREADSHEET_NS}}}c"):
                    reference = cell.attrib.get("r", "")
                    cells[column_index(reference)] = cell_value(
                        cell, shared_strings
                    )

                width = max(cells, default=-1) + 1
                yield tuple(cells.get(index, "") for index in range(width))
                element.clear()


def normalized_root(value: str) -> str:
    return " ".join(value.split())


def load_translation_occurrences() -> dict[str, list[dict[str, str]]]:
    rows = worksheet_rows(TRANSLATION_SOURCE_PATH)
    headers = tuple(next(rows))
    required_headers = ("ID", "ARABIC", "Translation", "Transliteration")
    missing_headers = [header for header in required_headers if header not in headers]
    if missing_headers:
        raise ValueError(
            f"Translation workbook is missing headers: {missing_headers}"
        )

    header_index = {header: headers.index(header) for header in required_headers}
    occurrences: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        source_id = row[header_index["ID"]].strip()
        if not source_id:
            continue
        occurrences[source_id].append(
            {
                "arabic": row[header_index["ARABIC"]].strip(),
                "transliteration": row[
                    header_index["Transliteration"]
                ].strip(),
                "translation": row[header_index["Translation"]].strip(),
            }
        )
    return occurrences


def build_families() -> dict[str, object]:
    translation_occurrences = load_translation_occurrences()
    occurrence_positions: dict[str, int] = defaultdict(int)
    rows = worksheet_rows(SOURCE_PATH)
    headers = tuple(next(rows))
    if headers[: len(EXPECTED_HEADERS)] != EXPECTED_HEADERS:
        raise ValueError(
            f"Unexpected headers {headers}; expected {EXPECTED_HEADERS}"
        )

    header_index = {header: index for index, header in enumerate(headers)}
    families: OrderedDict[
        str, OrderedDict[str, dict[str, str]]
    ] = OrderedDict()
    source_rows = 0

    for row in rows:
        source_rows += 1
        if len(row) <= header_index["Root_Letters"]:
            continue

        source_id = row[header_index["ID"]].strip()
        arabic = row[header_index["ARABIC"]].strip()
        root = normalized_root(row[header_index["Root_Letters"]])
        transliteration = row[header_index["Transliteration"]].strip()
        if not source_id or not arabic or not root:
            continue

        occurrence_index = occurrence_positions[source_id]
        occurrence_positions[source_id] += 1
        translations_for_id = translation_occurrences.get(source_id, [])
        if occurrence_index >= len(translations_for_id):
            raise ValueError(
                f"Missing translation occurrence {occurrence_index + 1} "
                f"for ID {source_id}"
            )
        translation_record = translations_for_id[occurrence_index]
        if (
            translation_record["arabic"] != arabic
            or translation_record["transliteration"] != transliteration
        ):
            raise ValueError(
                f"Translation mismatch for ID {source_id}, occurrence "
                f"{occurrence_index + 1}: {arabic}"
            )
        if not translation_record["translation"]:
            raise ValueError(
                f"Empty translation for ID {source_id}, occurrence "
                f"{occurrence_index + 1}"
            )

        words = families.setdefault(root, OrderedDict())
        words.setdefault(
            arabic,
            {
                "transliteration": transliteration,
                "translation": translation_record["translation"],
                "sourceId": source_id,
            },
        )

    unmatched_translation_ids = [
        source_id
        for source_id, occurrences in translation_occurrences.items()
        if occurrence_positions[source_id] != len(occurrences)
    ]
    if unmatched_translation_ids:
        raise ValueError(
            "Translation rows were not fully matched for IDs: "
            + ", ".join(unmatched_translation_ids[:10])
        )

    ordered_roots = list(families)
    if PREFERRED_FIRST_ROOT in families:
        ordered_roots.remove(PREFERRED_FIRST_ROOT)
        ordered_roots.insert(0, PREFERRED_FIRST_ROOT)

    output_families = []
    for index, root in enumerate(ordered_roots, start=1):
        output_families.append(
            {
                "id": f"root-{index:04d}",
                "rootLabel": root,
                "letters": root.split(" "),
                "words": [
                    {"arabic": arabic, **word_data}
                    for arabic, word_data in families[root].items()
                ],
            }
        )

    return {
        "source": "references/Cleaned_Root_letters.xlsx",
        "translationSource": "references/QuranRootLetters.xlsx",
        "translationSelection": (
            "First occurrence for each exact ARABIC form within a root"
        ),
        "sourceRows": source_rows,
        "rootCount": len(output_families),
        "uniqueRootWordPairs": sum(
            len(family["words"]) for family in output_families
        ),
        "families": output_families,
    }


def main() -> None:
    data = build_families()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    print(
        f"Generated {data['rootCount']} roots and "
        f"{data['uniqueRootWordPairs']} unique root-word pairs"
    )


if __name__ == "__main__":
    main()
