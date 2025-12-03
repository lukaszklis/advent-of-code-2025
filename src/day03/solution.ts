export const part1 = (input: string): string => {
  return getMaxJoltage(input, 2)
}

export const part2 = (input: string): string => {
  return getMaxJoltage(input, 12)
}

const getMaxJoltage = (input: string, count: number): string => {
  const banks = parseBanks(input)
  let total = 0

  for (const bank of banks) {
    const batteries = parseBatteries(bank)
    total += pickMaxNumber(batteries, count)
  }

  return `${total}`
}

const parseBanks = (input: string): string[] => {
  return input.trim().split('\n')
}

const parseBatteries = (bank: string): number[] => {
  return bank.split('').map(Number)
}

const pickMaxNumber = (digits: number[], count: number): number => {
  const picked: number[] = []
  let remaining = digits

  for (let i = 0; i < count; i++) {
    const picksRemaining = count - i - 1
    const candidates = remaining.slice(0, remaining.length - picksRemaining)
    const max = Math.max(...candidates)

    picked.push(max)

    remaining = remaining.slice(candidates.indexOf(max) + 1)
  }

  return Number(picked.join(''))
}
