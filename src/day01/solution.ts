type Direction = 'L' | 'R'
type Rotation = `${Direction}${number}`
type ParsedRotation = {
  delta: number
  distance: number
  isLeft: boolean
}

export const part1 = (input: string): string => {
  const rotations = parseRotations(input)
  let point = START
  let zeros = 0

  for (const rotation of rotations) {
    point = mod(point + parseRotation(rotation).delta)

    if (point === 0) zeros++
  }

  return `${zeros}`
}

export const part2 = (input: string): string => {
  const rotations = parseRotations(input)
  let point = START
  let zeros = 0

  for (const rotation of rotations) {
    const { delta, distance, isLeft } = parseRotation(rotation)
    zeros += countZerosCrossed(point, distance, isLeft)
    point = mod(point + delta)
  }

  return `${zeros}`
}

const parseRotations = (input: string): Rotation[] =>
  input
    .trim()
    .split('\n')
    .map(r => r.trim() as Rotation)

const parseRotation = (rotation: Rotation): ParsedRotation => {
  const direction = rotation[0] as Direction
  const distance = Number.parseInt(rotation.slice(1), 10)
  const isLeft = direction === 'L'

  return {
    delta: isLeft ? -distance : distance,
    distance,
    isLeft,
  }
}

const mod = (n: number): number => ((n % DIAL_SIZE) + DIAL_SIZE) % DIAL_SIZE

const countZerosCrossed = (start: number, distance: number, isLeft: boolean): number => {
  if (!isLeft) return Math.floor((start + distance) / DIAL_SIZE)

  if (start === 0) return Math.floor(distance / DIAL_SIZE)

  return distance >= start ? Math.floor((distance - start) / DIAL_SIZE) + 1 : 0
}

const DIAL_SIZE = 100
const START = 50
