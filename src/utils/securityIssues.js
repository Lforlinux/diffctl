// Security vulnerabilities to trigger Quality Gate failure

// CRITICAL: Using eval() - Code injection vulnerability
export function executeUserCode(userInput) {
  return eval(userInput) // CRITICAL SECURITY ISSUE
}

// CRITICAL: Hardcoded secrets
export const DATABASE_PASSWORD = "SuperSecret123!"
export const API_SECRET_KEY = "FAKE_SECRET_KEY_FOR_TESTING_ONLY_12345"
export const JWT_SECRET = "my-secret-key-12345"

// CRITICAL: SQL Injection pattern
export function getUserData(userId) {
  const query = `SELECT * FROM users WHERE id = ${userId}` // SQL injection risk
  return query
}

// CRITICAL: XSS vulnerability pattern
export function renderUserContent(content) {
  return `<div>${content}</div>` // XSS risk - no sanitization
}

// HIGH: Weak cryptography
export function hashPassword(password) {
  return btoa(password) // Base64 is not encryption!
}

// HIGH: Insecure random number generation
export function generateToken() {
  return Math.random().toString() // Not cryptographically secure
}

