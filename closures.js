export function createFunction() {
  return function () {
    console.log('hello')
    return 'hello'
  }
}

export function createFunctionPrinter(input) {
  return function () {
    return input
  }
}

function outer() {
  let counter = 0 // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++
    console.log('counter', counter)
  }
  return incrementCounter
}

export function addBy(input) {
  return function (value) {
    return input + value
  }
}

export function once(callback) {
  let cache = null

  return function (...args) {
    if (cache) return cache
    cache = callback(...args)
    return cache
  }
}

export function after(count, func) {
  let called = 0

  return function () {
    if (called === count) {
      func()
    } else {
      called++
    }
  }
}

export function delay(func, wait) {
  return function () {
    setTimeout(() => {
      func()
    }, wait)
  }
}

export function rollCall(names) {
  let toBeCalled = [...names]
  return function () {
    const name = toBeCalled.shift()
    if (name) {
      console.log(name)
    } else {
      console.log('Everyone accounted so far')
    }
  }
}

export function saveOutput(func, magicWord) {
  let passedValues = {}
  return function (value) {
    if (value === magicWord) return passedValues
    const result = func(value)
    passedValues[value] = result
    return func(value)
  }
}

export function cycleIterator(array) {
  let lastIndex = 0
  return function () {
    if (array.length === 0) return 0
    if (!array[lastIndex]) return array[0]

    return array[lastIndex++]
  }
}

export function defineFirstArg(func, arg) {
  return function (value) {
    return func(arg, value)
  }
}

export function dateStamp(func) {
  return function (...args) {
    return { date: new Date(), output: func(...args) }
  }
}

export function censor() {
  const pairs = {}
  return function (value1, value2) {
    if (value2) {
      pairs[value1] = value2
    } else {
      let returnString = value1
      Object.keys(pairs).forEach((key) => {
        returnString = returnString.replace(key, pairs[key])
      })
      return returnString
    }
  }
}

export function createSecretHolder(secret) {
  let storedSecret = secret
  return {
    getSecret: function () {
      return storedSecret
    },
    setSecret: function (value) {
      storedSecret = value
    },
  }
}

export function callTimes() {
  let getCalledCount = 0
  return function () {
    return ++getCalledCount
  }
}

export function russianRoulette(num) {
  let count = 0
  return function () {
    count++
    if (count === num) {
      return 'bang'
    } else if (count > num) return 'reload to play again'
    else {
      return 'click'
    }
  }
}

export function average() {
  let nums = []
  const currentAverage = () => nums.reduce((curr, next) => curr + next, 0) / nums.length

  return function (num) {
    if (num) {
      nums.push(num)
      return currentAverage()
    }
    return nums.length === 0 ? 0 : currentAverage()
  }
}

export function makeFuncTest(arrayOfTests) {
  return function (callback) {
    let allPositive = true
    arrayOfTests.forEach((subArray) => {
      if (callback(subArray[0]) !== subArray[1]) {
        allPositive = false
        return
      }
    })

    return allPositive
  }
}

export function makeHistory(limit) {
  let history = []
  return function (value) {
    if (value === 'undo') {
      return history.length === 0 ? 'nothing to undo' : history.pop() + ' undone'
    }
    if (history.length === limit) history.shift()
    history.push(value)
    return value + ' done'
  }
}
