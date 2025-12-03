import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const dayNumber = process.argv[2]

if (!dayNumber) {
  console.error('Usage: pnpm generate-day <dayNumber>')
  console.error('Example: pnpm generate-day 2')
  process.exit(1)
}

const day = dayNumber.padStart(2, '0')
const dayFolder = `day${day}`
const srcDayPath = join(rootDir, 'src', dayFolder)

const solutionTemplate = `export function part1(input: string): string {
  throw new Error('Not implemented')
}

export function part2(input: string): string {
  throw new Error('Not implemented')
}
`

const testTemplate = `import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { part1, part2 } from './solution'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day ${dayNumber}', () => {
  it('should solve part 1', async () => {
    const input = await readFile(join(__dirname, 'input1.txt'), 'utf-8')
    const expectation = await readFile(join(__dirname, 'expectation1.txt'), 'utf-8')

    expect(part1(input.trim())).toBe(expectation.trim())
  })

  // Remove the skip once you're ready to solve part 2
  it.skip('should solve part 2', async () => {
    const input = await readFile(join(__dirname, 'input2.txt'), 'utf-8')
    const expectation = await readFile(join(__dirname, 'expectation2.txt'), 'utf-8')

    expect(part2(input.trim())).toBe(expectation.trim())
  })
})
`

const readmeTemplate = `# Day ${dayNumber}

<https://adventofcode.com/2025/day/${dayNumber}>

## Part 1

TBP

## Part 2

TBP
`

try {
  await mkdir(srcDayPath, { recursive: true })

  await writeFile(join(srcDayPath, 'solution.ts'), solutionTemplate)
  await writeFile(join(srcDayPath, 'solution.test.ts'), testTemplate)
  await writeFile(join(srcDayPath, 'README.md'), readmeTemplate)
  await writeFile(join(srcDayPath, 'input1.txt'), '')
  await writeFile(join(srcDayPath, 'input2.txt'), '')
  await writeFile(join(srcDayPath, 'expectation1.txt'), '')
  await writeFile(join(srcDayPath, 'expectation2.txt'), '')

  console.log(`✅ Generated day ${dayNumber}:`)
  console.log(`   - src/${dayFolder}/solution.ts`)
  console.log(`   - src/${dayFolder}/solution.test.ts`)
  console.log(`   - src/${dayFolder}/README.md`)
  console.log(`   - src/${dayFolder}/input1.txt`)
  console.log(`   - src/${dayFolder}/input2.txt`)
  console.log(`   - src/${dayFolder}/expectation1.txt`)
  console.log(`   - src/${dayFolder}/expectation2.txt`)
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error)

  console.error('Error generating day:', errorMessage)
  process.exit(1)
}
