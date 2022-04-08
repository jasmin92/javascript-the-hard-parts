// 1
export function addTwo(num) {
  return num + 2
}

export function addS(input) {
  return input + 's'
}

export const multipleByTwo = (value) => value * 2

export function map(inputArray, callback) {
  let returnArray = []

  for (let i = 0; i < inputArray.length; i++) {
    returnArray[i] = callback(inputArray[i])
  }

  return returnArray
}

export function forEach(inputArray, callback) {
  for (let i = 0; i < inputArray.length; i++) {
    callback(inputArray[i], i)
  }
}

export function mapWith(inputArray, callback) {
  let returnArray = []

  forEach(inputArray, (item, index) => {
    returnArray[index] = callback(item)
  })

  return returnArray
}

export function reduce(inputArray, callback, initialValue) {
  let accum = initialValue ?? inputArray[0].slice()

  for (let i = 0; i < inputArray.length; i++) {
    accum = callback(accum, inputArray[i])
  }

  return accum
}

export function intersection(...arrays) {
  return reduce(arrays, intersectionOfTwoArrays)
}

export const intersectionOfTwoArrays = (a, b) => {
  let returnArray = []

  b.forEach((item) => {
    if (a.includes(item) && !returnArray.includes(item)) {
      returnArray.push(item)
    }
  })

  return returnArray
}

export function union(arrays) {
  return arrays.reduce((acc, next) => {
    const newArray = next.filter((item) => !acc.includes(item))
    return acc.concat(newArray)
  })
}

export function objOfMatches(array1, array2, callback) {
  const result = {}
  array1.forEach((item, index) => {
    let calculatedValue = callback(item)
    if (calculatedValue === array2[index]) {
      result[item] = array2[index]
    }
  })
  return result
}

export function multiMap(values, callbacks) {
  let output = {}
  values.forEach((item) => {
    output[item] = callbacks.map((callback) => callback(item))
  })

  return output
}

export function objectFilter(object, callback) {
  const output = {}
  Object.keys(object).forEach((key) => {
    if (callback(key) === object[key]) {
      output[key] = object[key]
    }
  })

  return output
}

export function majority(array, callback) {
  let trueValues = 0
  array.forEach((item) => {
    if (callback(item)) trueValues++
  })

  return trueValues > array.length - trueValues
}

export function prioritize(array, callback) {
  let trueValues = []
  let falseValues = []
  array.forEach((item) => {
    if (callback(item)) trueValues.push(item)
    else falseValues.push(item)
  })

  return [...trueValues, ...falseValues]
}

export function countBy(array, callback) {
  let output = {}
  array.forEach((item) => {
    let currentResult = callback(item)
    if (output[currentResult]) output[currentResult]++
    else output[currentResult] = 1
  })

  return output
}

export function groupBy(array, callback) {
  const output = {}
  array.forEach((item) => {
    let currentResult = callback(item)
    if (output[currentResult]) output[currentResult].push(item)
    else output[currentResult] = [item]
  })

  return output
}

export function goodKeys(object, callback) {
  return Object.keys(object).reduce((acc, next) => {
    let currentResult = callback(object[next])
    if (currentResult) acc.push(next)
    return acc
  }, [])
}

export function commutative(callback1, callback2, value) {
  return callback2(callback1(value)) === callback1(callback2(value))
}

export function objFilter(object, callback) {
  let output = {}
  Object.keys(object).forEach((key) => {
    if (callback(key) === object[key]) {
      output[key] = object[key]
    }
  })

  return output
}

export function rating(functions, value) {
  let trueValues = 0
  functions.forEach((fn) => {
    if (fn(value)) trueValues++
  })

  return (trueValues / functions.length) * 100
}

export function pipe(functions, value) {
  let output = value
  functions.forEach((fn) => (output = fn(output)))
  return output
}

export function highestFunc(obj, subject) {
  let highestKey = null
  let highestValue = Number.MIN_VALUE
  Object.keys(obj).forEach((key) => {
    let fnValue = obj[key](subject)
    if (fnValue > highestValue) {
      highestValue = fnValue
      highestKey = key
    }
  })

  return highestKey
}
