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
