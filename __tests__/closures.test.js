import { test, expect, vi } from 'vitest'
import { createFunction, createFunctionPrinter, addBy, once, after } from '../closures'

test('createFunction', () => {
  const testFunction = createFunction()
  expect(testFunction()).toBe('hello')
})

test('createFunctionPrinter', () => {
  const printSample = createFunctionPrinter('sample')
  expect(printSample()).toBe('sample')
})

const addByTwo = addBy(2)
const addByThree = addBy(3)

test('addBy', () => {
  expect(addByTwo(1)).toBe(3)
  expect(addByTwo(2)).toBe(4)
  expect(addByTwo(3)).toBe(5)

  expect(addByThree(1)).toBe(4)
  expect(addByThree(2)).toBe(5)
  expect(addByThree(3)).toBe(6)
})

test('once', () => {
  const onceFunc = once(addByTwo)
  expect(onceFunc(4, 2)).toBe(6)
  expect(onceFunc(12)).toBe(6)
  expect(onceFunc(5001)).toBe(6)
})

test('after', () => {
  const mockFunction = vi.fn()
  const afterCalled = after(3, mockFunction)

  afterCalled()
  afterCalled()
  afterCalled()
  expect(mockFunction).not.toHaveBeenCalled()
  afterCalled()
  expect(mockFunction).toHaveBeenCalledOnce()
})
