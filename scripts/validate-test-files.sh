#!/bin/bash

# This script validates that solution.test.ts files follow the expected template.
# This ensures that test files don't contain hardcoded answers.
#
# Usage:
#   bash scripts/validate-test-files.sh [files...]
#
# If no files are provided, validates all src/day*/solution.test.ts files.
# If files are provided, only validates those that match solution.test.ts pattern.

FAILED=0
CHECKED=0
TEMPLATE='import { readFile } from '\''node:fs/promises'\''
import { dirname, join } from '\''node:path'\''
import { fileURLToPath } from '\''node:url'\''
import { describe, expect, it } from '\''vitest'\''
import { part1, part2 } from '\''./solution'\''

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('\''Day DAY_NUMBER'\'', () => {
  it('\''should solve part 1'\'', async () => {
    const input = await readFile(join(__dirname, '\''input1.txt'\''), '\''utf-8'\'')
    const expectation = await readFile(join(__dirname, '\''expectation1.txt'\''), '\''utf-8'\'')

    expect(part1(input.trim())).toBe(expectation.trim())
  })

  it('\''should solve part 2'\'', async () => {
    const input = await readFile(join(__dirname, '\''input2.txt'\''), '\''utf-8'\'')
    const expectation = await readFile(join(__dirname, '\''expectation2.txt'\''), '\''utf-8'\'')

    expect(part2(input.trim())).toBe(expectation.trim())
  })
})
'

validate_file() {
  local file="$1"

  # Skip if not a solution.test.ts file
  if [[ ! "$file" =~ solution\.test\.ts$ ]]; then
    return
  fi

  # Skip if file doesn't exist (e.g., deleted in the diff)
  if [ ! -f "$file" ]; then
    return
  fi

  CHECKED=$((CHECKED + 1))

  # Extract day number from directory name (e.g., day01 -> 1, day12 -> 12)
  DAY_NUM=$(echo "$file" | sed -E 's/.*day0*([0-9]+).*/\1/')

  # Create expected content for this day
  EXPECTED=$(echo "$TEMPLATE" | sed "s/DAY_NUMBER/$DAY_NUM/g")

  # Get actual file content
  ACTUAL=$(cat "$file")

  if [ "$EXPECTED" != "$ACTUAL" ]; then
    echo "❌ $file does not match the expected template"
    echo "This check ensures test files don't contain hardcoded answers."
    echo ""
    echo "Expected content:"
    echo "$EXPECTED"
    echo ""
    echo "Actual content:"
    echo "$ACTUAL"
    FAILED=1
  else
    echo "✅ $file matches template"
  fi
}

# If arguments provided, validate only those files
# Otherwise, validate all solution.test.ts files
if [ $# -gt 0 ]; then
  for file in "$@"; do
    validate_file "$file"
  done
else
  for file in src/day*/solution.test.ts; do
    validate_file "$file"
  done
fi

if [ $CHECKED -eq 0 ]; then
  echo "No solution.test.ts files to validate"
  exit 0
fi

if [ $FAILED -eq 1 ]; then
  echo ""
  echo "Some test files don't match the expected template."
  echo "Please ensure test files only contain the standard template without modifications."
  exit 1
fi
