import { expect, test } from 'vitest'
import {
  addS,
  addTwo,
  multipleByTwo,
  map,
  forEach,
  reduce,
  intersectionOfTwoArrays,
  intersection,
  union,
  objOfMatches,
  multiMap,
  objectFilter,
  majority,
  prioritize,
  countBy,
  groupBy,
  goodKeys,
  commutative,
  objFilter,
  rating,
  pipe,
} from '..'

test('addTwo', () => {
  const result = addTwo(1)
  expect(result).toBe(3)
})

test('addS', () => {
  expect(addS('dog')).toBe('dogs')
})

test('multipleByTwo', () => {
  expect(multipleByTwo(2)).toBe(4)
})

test('map', () => {
  const result = map([1, 2, 3], (a) => a + 1)
  expect(result).toEqual([2, 3, 4])
})

test('forEach', () => {
  let result = []
  const callback = (item, index) => (result[index] = item + 2)
  forEach([1, 2, 3], callback)

  expect(result).toEqual([3, 4, 5])
})

test('reduce', () => {
  const result = reduce([1, 2, 3], (a, b) => a + b, 0)
  expect(result).toBe(6)
})

test('intersection', () => {
  const array1 = [1, 2]
  const array2 = [1, 2, 3]
  const array3 = [1, 4, 5, 7]
  const array4 = [6, 3, 3]

  expect(intersectionOfTwoArrays(array1, array3)).toEqual([1])
  expect(intersection(array1, array2)).toEqual([1, 2])
  expect(intersection(array1, array2, array3)).toEqual([1])
  expect(intersection(array1, array4)).toEqual([])
})

test('union', () => {
  expect(
    union([
      [5, 10, 15],
      [15, 88, 1, 5, 7],
      [100, 15, 10, 1, 5],
    ])
  ).toEqual([5, 10, 15, 88, 1, 7, 100])
})

test('objectOfMatches', () => {
  const arra1 = ['hi', 'howdy', 'bye', 'later', 'hello']
  const arra2 = ['HI', 'Howdy', 'BYE', 'LATER', 'hello']
  const callback = (str) => str.toUpperCase()

  expect(objOfMatches(arra1, arra2, callback)).toEqual({
    hi: 'HI',
    bye: 'BYE',
    later: 'LATER',
  })
})

test('multiMap', () => {
  const values = ['catfood', 'glue', 'beer']
  const callback1 = (str) => str.toUpperCase()
  const callback2 = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()
  const callback3 = (str) => str + str

  const result = multiMap(values, [callback1, callback2, callback3])
  expect(result).toEqual({
    catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'],
    glue: ['GLUE', 'Glue', 'glueglue'],
    beer: ['BEER', 'Beer', 'beerbeer'],
  })
})

test('objectFilter', () => {
  const cities = {
    London: 'LONDON',
    LA: 'Los Angeles',
    Paris: 'PARIS',
  }
  expect(objectFilter(cities, (city) => city.toUpperCase())).toEqual({ London: 'LONDON', Paris: 'PARIS' })
})

test('majority', () => {
  const isOdd = function (num) {
    return num % 2 === 1
  }
  expect(majority([1, 2, 3, 4, 5], isOdd)).toBe(true)
  expect(majority([1, 2, 3, 4], isOdd)).toBe(false)
  expect(majority([1, 2, 4, 6], isOdd)).toBe(false)
})

test('prioritize', () => {
  const startsWithS = function (str) {
    return str[0] === 's' || str[0] === 'S'
  }
  const result = prioritize(['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'], startsWithS)
  expect(result).toEqual(['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends'])
})

test('countBy', () => {
  function oddOrEven(num) {
    if (num % 2 === 0) return 'even'
    else return 'odd'
  }
  expect(countBy([1, 2, 3, 4, 5], oddOrEven)).toEqual({ odd: 3, even: 2 })
})

test('groupBy', () => {
  const decimals = [1.3, 2.1, 2.4]
  const floored = function (num) {
    return Math.floor(num)
  }
  expect(groupBy(decimals, floored)).toEqual({ 1: [1.3], 2: [2.1, 2.4] })
})

test('goodKeys', () => {
  const sunny = { mac: 'priest', dennis: 'calculating', charlie: 'birdlaw', dee: 'bird', frank: 'warthog' }
  const startsWithBird = function (str) {
    return str.slice(0, 4).toLowerCase() === 'bird'
  }

  expect(goodKeys(sunny, startsWithBird)).toEqual(['charlie', 'dee'])
})

test('commumative', () => {
  const multBy3 = (n) => n * 3
  const divBy4 = (n) => n / 4
  const subtract5 = (n) => n - 5

  expect(commutative(multBy3, divBy4, 11)).toBe(true)
  expect(commutative(multBy3, subtract5, 10)).toBe(false)
  expect(commutative(divBy4, subtract5, 48)).toBe(false)
})

test('objFilter', () => {
  const startingObj = {}
  startingObj[6] = 3
  startingObj[2] = 1
  startingObj[12] = 4
  const half = (n) => n / 2

  expect(objFilter(startingObj, half)).toEqual({ 2: 1, 6: 3 })
})

test('rating', () => {
  const isEven = (n) => n % 2 === 0
  const greaterThanFour = (n) => n > 4
  const isSquare = (n) => Math.sqrt(n) % 1 === 0
  const hasSix = (n) => n.toString().includes('6')
  const checks = [isEven, greaterThanFour, isSquare, hasSix]

  expect(rating(checks, 64)).toBe(100)
  expect(rating(checks, 66)).toBe(75)
})

test('pipe', () => {
  const capitalize = (str) => str.toUpperCase()
  const addLowerCase = (str) => str + str.toLowerCase()
  const repeat = (str) => str + str
  const capAddlowRepeat = [capitalize, addLowerCase, repeat]
  expect(pipe(capAddlowRepeat, 'cat')).toBe('CATcatCATcat')
})
