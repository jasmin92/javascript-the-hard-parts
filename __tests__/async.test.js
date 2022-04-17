import { test, expect, vi, describe } from 'vitest'
import { delayedGreet, limitedRepeat } from '../async'
import { wait } from '../utils'

// describe.concurrent('', () => {})
const consoleMock = vi.spyOn(console, 'log').mockImplementation()

test('delayedGreet', async () => {
  delayedGreet(100)
  expect(consoleMock).not.toHaveBeenCalled()
  await wait(100)
  expect(consoleMock).toHaveBeenCalledWith('welcome')
})

test('limitedRepeat', async () => {
  limitedRepeat()

  await wait(5000)
  expect(consoleMock).toHaveBeenNthCalledWith(5, 'hi for now')
})
