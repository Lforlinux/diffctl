// Code duplication issues

// Duplicate code block 1
export function formatName1(first, last) {
  const trimmedFirst = first.trim()
  const trimmedLast = last.trim()
  const capitalizedFirst = trimmedFirst.charAt(0).toUpperCase() + trimmedFirst.slice(1)
  const capitalizedLast = trimmedLast.charAt(0).toUpperCase() + trimmedLast.slice(1)
  return `${capitalizedFirst} ${capitalizedLast}`
}

// Duplicate code block 2 (same logic as formatName1)
export function formatName2(first, last) {
  const trimmedFirst = first.trim()
  const trimmedLast = last.trim()
  const capitalizedFirst = trimmedFirst.charAt(0).toUpperCase() + trimmedFirst.slice(1)
  const capitalizedLast = trimmedLast.charAt(0).toUpperCase() + trimmedLast.slice(1)
  return `${capitalizedFirst} ${capitalizedLast}`
}

// Duplicate code block 3 (same logic again)
export function formatName3(first, last) {
  const trimmedFirst = first.trim()
  const trimmedLast = last.trim()
  const capitalizedFirst = trimmedFirst.charAt(0).toUpperCase() + trimmedFirst.slice(1)
  const capitalizedLast = trimmedLast.charAt(0).toUpperCase() + trimmedLast.slice(1)
  return `${capitalizedFirst} ${capitalizedLast}`
}

// Another duplicate pattern
export function validateEmail1(email) {
  if (!email) return false
  if (email.length < 5) return false
  if (!email.includes("@")) return false
  if (!email.includes(".")) return false
  return true
}

export function validateEmail2(email) {
  if (!email) return false
  if (email.length < 5) return false
  if (!email.includes("@")) return false
  if (!email.includes(".")) return false
  return true
}

export function validateEmail3(email) {
  if (!email) return false
  if (email.length < 5) return false
  if (!email.includes("@")) return false
  if (!email.includes(".")) return false
  return true
}

