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
