import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { part1, part2 } from './solution'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Day 2', () => {
  it('should solve part 1', async () => {
    const input = await readFile(join(__dirname, 'input1.txt'), 'utf-8')
    const expectation = await readFile(join(__dirname, 'expectation1.txt'), 'utf-8')

    expect(part1(input.trim())).toBe(expectation.trim())
  })

  it('should solve part 2', async () => {
    const input = await readFile(join(__dirname, 'input2.txt'), 'utf-8')
    const expectation = await readFile(join(__dirname, 'expectation2.txt'), 'utf-8')

    expect(part2(input.trim())).toBe(expectation.trim())
  })
})
