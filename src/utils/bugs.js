// Bugs and potential runtime errors

// Bug: Potential null pointer exception
export function processUser(user) {
  return user.name.toUpperCase() // No null check
}

// Bug: Array access without bounds check
export function getFirstItem(items) {
  return items[0].value // Could be undefined
}

// Bug: Division by zero
export function calculateAverage(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0)
  return sum / numbers.length // Could divide by zero if array is empty
}

// Bug: Infinite loop potential
export function processItems(items) {
  let index = 0
  while (index < items.length) {
    // Missing index increment - infinite loop!
    console.log(items[index])
  }
}

// Bug: Type coercion issue
export function compareValues(a, b) {
  return a == b // Should use === for strict comparison
}

// Bug: Missing return statement
export function getResult(data) {
  if (data) {
    return "success"
  }
  // No return for else case
}

// Bug: Uninitialized variable usage
export function calculateTotal(items) {
  let total
  items.forEach(item => {
    total += item.price // total is undefined initially
  })
  return total
}

// Bug: Async/await without error handling
export async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`)
  return response.json() // No error handling
}

