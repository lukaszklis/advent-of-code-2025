type Range = [number, number]

export const part1 = (input: string): string => {
  return `${sumMatchingIds(parseRanges(input), isMirrored)}`
}

export const part2 = (input: string): string => {
  return `${sumMatchingIds(parseRanges(input), isRepeatedSequence)}`
}

const sumMatchingIds = (ranges: Range[], predicate: (id: string) => boolean): number => {
  let sum = 0

  for (const range of ranges) {
    const [start, end] = range

    for (let i = start; i <= end; i++) {
      if (predicate(`${i}`)) {
        sum += i
      }
    }
  }

  return sum
}

const parseRanges = (input: string): Range[] => {
  return input
    .trim()
    .split(',')
    .map(r => r.trim().split('-').map(Number) as Range)
}

const isMirrored = (candidate: string): boolean => {
  if (candidate.length % 2 !== 0) return false

  const half = candidate.length / 2

  return candidate.slice(0, half) === candidate.slice(half)
}

const isRepeatedSequence = (candidate: string): boolean => {
  for (let len = 1; len <= candidate.length / 2; len++) {
    if (candidate.length % len !== 0) continue

    const unit = candidate.slice(0, len)
    const repeatCount = candidate.length / len

    if (unit.repeat(repeatCount) === candidate) {
      return true
    }
  }

  return false
}
