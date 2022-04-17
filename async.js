export function delayedGreet(timeout) {
  setTimeout(() => {
    console.log('welcome')
  }, timeout)
}

export function limitedRepeat() {
  let count = 0
  const id = setInterval(() => {
    count++
    console.log('hi for now')
    if (count === 5) {
    }
  }, 1000)
}

export function everyXsecsForYsecs(func, interval, duration) {
  let elapsed = 0
  const intervalId = setInterval(() => {
    if (elapsed >= duration) {
      clearInterval(intervalId)
      return
    }

    func()
    elapsed += interval
  }, interval)
}

export function delayCounter(target, wait) {
  let index = 1
  const interval = setInterval(() => {
    if (index > target) {
      clearInterval(interval)
      return
    }
    console.log(index++)
  }, wait)
}
