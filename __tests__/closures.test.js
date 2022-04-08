import { test, expect } from 'vitest'
import { createFunction, createFunctionPrinter, addBy } from '../closures'

test('createFunction', () => {
  const testFunction = createFunction()
  expect(testFunction()).toBe('hello')
})

test('createFunctionPrinter', () => {
  const printSample = createFunctionPrinter('sample')
  expect(printSample()).toBe('sample')
})

test('addBy', () => {
  const addByTwo = addBy(2)
  const addByThree = addBy(3)

  expect(addByTwo(1)).toBe(3)
  expect(addByTwo(2)).toBe(4)
  expect(addByTwo(3)).toBe(5)

  expect(addByThree(1)).toBe(4)
  expect(addByThree(2)).toBe(5)
  expect(addByThree(3)).toBe(6)
})
