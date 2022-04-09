import { test, expect, vi } from 'vitest'
import { createFunction, createFunctionPrinter, addBy, once, after, delay, rollCall } from '../closures'

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

// test('delay', async () => {
//   const mockFn = vi.fn()
//   const testDelay = delay(mockFn, 1000)
//   testDelay()
//   expect(mockFn).not.toHaveBeenCalled()

//   await new Promise((r) => setTimeout(r, 1000))
//   expect(mockFn).toHaveBeenCalled()
// })

test('rollCall', () => {
  const names = ['Victoria', 'Juan', 'Ruth']
  const rollCaller = rollCall(names)
  const consoleMock = vi.spyOn(console, 'log').mockImplementation()

  names.forEach((name) => {
    rollCaller()
    expect(consoleMock).toHaveBeenCalledWith(name)
    consoleMock.mockClear()
  })

  rollCaller()
  expect(consoleMock).toHaveBeenCalledWith('Everyone accounted so far')
})
