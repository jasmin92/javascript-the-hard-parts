import { expect, test } from "vitest"
import {
  addS,
  addTwo,
  multipleByTwo,
  map,
  forEach,
  reduce,
  intersectionOfTwoArrays,
  intersection,
} from ".."

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
  const result = reduce([1, 2, 3], (a, b) => a + b, 0)
  expect(result).toBe(6)
})

test("intersection", () => {
  const array1 = [1, 2]
  const array2 = [1, 2, 3]
  const array3 = [1, 4, 5, 7]
  const array4 = [6, 3, 3]

  expect(intersectionOfTwoArrays(array1, array3)).toEqual([1])
  expect(intersection(array1, array2)).toEqual([1, 2])
  expect(intersection(array1, array2, array3)).toEqual([1])
  expect(intersection(array1, array4)).toEqual([])
})
