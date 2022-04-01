import { expect, test } from "vitest"
import { addS, addTwo, multipleByTwo, map, forEach, reduce } from ".."

test("addTwo", () => {
  const result = addTwo(1)
  expect(result).toBe(3)
})

test("addS", () => {
  expect(addS("dog")).toBe("dogs")
})

test("multipleByTwo", () => {
  expect(multipleByTwo(2)).toBe(4)
})

test("map", () => {
  const result = map([1, 2, 3], (a) => a + 1)
  expect(result).toEqual([2, 3, 4])
})

test("forEach", () => {
  let result = []
  const callback = (item, index) => (result[index] = item + 2)
  forEach([1, 2, 3], callback)

  expect(result).toEqual([3, 4, 5])
})

test("reduce", () => {
  let result = null
  result = reduce([1, 2, 3], (a, b) => a + b, 0)
  expect(result).toBe(6)
})
