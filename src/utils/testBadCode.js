// This file contains intentionally bad code to test SonarQube Quality Gate failure

// Security Issue: Using eval (CRITICAL)
function dangerousEval(userInput) {
  return eval(userInput) // Security vulnerability
}

// Security Issue: Hardcoded secret (CRITICAL)
const API_KEY = "sk_live_1234567890abcdef" // Hardcoded secret
const PASSWORD = "admin123" // Hardcoded password

// Code Smell: Unused variable
const unusedVariable = "This is never used"

// Code Smell: Complex function with too many parameters
function complexFunction(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return param1 + param2 + param3 + param4 + param5 + param6 + param7 + param8 + param9 + param10
}

// Bug: Potential null pointer
function processData(data) {
  return data.value.toString() // No null check
}

// Code Smell: Duplicate code
function calculateSum1(a, b) {
  return a + b
}

function calculateSum2(x, y) {
  return x + y // Duplicate of calculateSum1
}

// Security Issue: SQL injection risk (even though it's JS, SonarQube flags patterns)
function buildQuery(userId) {
  return `SELECT * FROM users WHERE id = ${userId}` // SQL injection risk pattern
}

// Code Smell: Empty catch block
try {
  dangerousOperation()
} catch (error) {
  // Empty catch - bad practice
}

// Bug: Infinite loop potential
function processItems(items) {
  while (true) {
    // No break condition
    items.forEach(item => {
      console.log(item)
    })
  }
}

// Code Smell: Too many nested if statements
function nestedHell(condition1, condition2, condition3, condition4) {
  if (condition1) {
    if (condition2) {
      if (condition3) {
        if (condition4) {
          return "too nested"
        }
      }
    }
  }
}

export { dangerousEval, processData, buildQuery, processItems, nestedHell }

