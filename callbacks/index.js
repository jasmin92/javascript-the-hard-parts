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
