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
