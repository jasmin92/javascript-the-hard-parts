import { test, expect, vi, describe } from 'vitest'
import {
  createFunction,
  createFunctionPrinter,
  addBy,
  once,
  after,
  delay,
  rollCall,
  saveOutput,
  cycleIterator,
  defineFirstArg,
  dateStamp,
  censor,
  createSecretHolder,
  callTimes,
  russianRoulette,
} from '../closures'

describe.concurrent('sync', () => {
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

  test.concurrent('delay', async () => {
    const mockFn = vi.fn()
    const testDelay = delay(mockFn, 1000)
    testDelay()
    expect(mockFn).not.toHaveBeenCalled()

    await new Promise((r) => setTimeout(r, 1000))
    expect(mockFn).toHaveBeenCalled()
  })

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

  test('saveOutput', () => {
    const multiplyBy2 = function (num) {
      return num * 2
    }
    const multBy2AndLog = saveOutput(multiplyBy2, 'boo')

    expect(multBy2AndLog(2)).toBe(4)
    expect(multBy2AndLog(9)).toBe(18)
    expect(multBy2AndLog('boo')).toEqual({ 2: 4, 9: 18 })
  })

  test('cycleIterator', () => {
    const threeDayWeekend = ['Fri', 'Sat', 'Sun']
    const getDay = cycleIterator(threeDayWeekend)

    expect(getDay()).toBe('Fri')
    expect(getDay()).toBe('Sat')
    expect(getDay()).toBe('Sun')
    expect(getDay()).toBe('Fri')
  })

  test('defineFirstArg', () => {
    const subtract = function (big, small) {
      return big - small
    }
    const subFrom20 = defineFirstArg(subtract, 20)

    expect(subFrom20(5)).toBe(15)
  })

  test('dateStamp', () => {
    const stampedMultBy2 = dateStamp((n) => n * 2)
    expect(stampedMultBy2(4)).toEqual({ date: new Date(), output: 8 })
    expect(stampedMultBy2(6)).toEqual({ date: new Date(), output: 12 })
  })

  test('censor', () => {
    const changeScene = censor()
    changeScene('dogs', 'cats')
    changeScene('quick', 'slow')
    expect(changeScene('The quick, brown fox jumps over the lazy dogs.')).toBe(
      'The slow, brown fox jumps over the lazy cats.'
    )
  })

  test('createSecretHolder', () => {
    const obj = createSecretHolder(5)
    expect(obj.getSecret()).toBe(5)
    obj.setSecret(2)
    expect(obj.getSecret()).toBe(2)
  })

  test('callTimes', () => {
    let myNewFunc1 = callTimes()
    let myNewFunc2 = callTimes()
    expect(myNewFunc1()).toBe(1)
    expect(myNewFunc1()).toBe(2)
    expect(myNewFunc2()).toBe(1)
    expect(myNewFunc2()).toBe(2)
  })

  test('russianRoulette', () => {
    const play = russianRoulette(3)
    expect(play()).toBe('click')
    expect(play()).toBe('click')
    expect(play()).toBe('bang')
    expect(play()).toBe('reload to play again')
    expect(play()).toBe('reload to play again')
  })
})
