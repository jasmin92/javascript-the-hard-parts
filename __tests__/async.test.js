import { test, expect, vi, describe, beforeEach, afterEach } from 'vitest'
import { delayCounter, delayedGreet, everyXsecsForYsecs, limitedRepeat, promised, SecondClock } from '../async'
import { wait } from '../utils'

// describe.concurrent('', () => {})
let consoleMock

beforeEach(() => {
  consoleMock = vi.spyOn(console, 'log').mockImplementation()
})

afterEach(() => {
  consoleMock.mockReset()
})

// test('delayedGreet', async () => {
//   delayedGreet(100)
//   expect(consoleMock).not.toHaveBeenCalled()
//   await wait(100)
//   expect(consoleMock).toHaveBeenCalledWith('welcome')
// })

// test('limitedRepeat', async () => {
//   limitedRepeat()

//   await wait(5000)
//   expect(consoleMock).toHaveBeenNthCalledWith(5, 'hi for now')
// })

// test('everyXsecsForYsecs', async () => {
//   const mockFunction = vi.fn()
//   everyXsecsForYsecs(mockFunction, 1000, 3000)
//   await wait(4000)
//   expect(mockFunction).toHaveBeenCalledTimes(3)
//   expect(mockFunction).not.toHaveBeenCalledTimes(4)
// })

// test('delayCounter', async () => {
//   delayCounter(5, 50)
//   for (let i = 1; i <= 5; i++) {
//     await wait(50)
//     expect(consoleMock).toHaveBeenCalledWith(i)
//   }
// })

// test('promised', async () => {
//   const value = await promised('hello')
//   expect(value).toBe('hello')
// })

test('secondClock', async () => {
  const clock = new SecondClock((val) => {
    console.log(val)
  })
  for (let i = 1; i <= 2; i++) {
    await wait(1000)
    expect(consoleMock).toHaveBeenCalledWith(i)
  }

  clock.reset()
  clock.start()

  await wait(1000)
  expect(consoleMock).toHaveBeenLastCalledWith(1)
  clock.reset()
})
