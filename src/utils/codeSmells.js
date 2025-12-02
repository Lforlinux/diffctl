// Code smells and maintainability issues

// Code Smell: Unused variables
const unusedVar1 = "never used"
const unusedVar2 = 42
const unusedVar3 = { key: "value" }

// Code Smell: Too many parameters (should be max 7)
export function processUserData(
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  state,
  zipCode,
  country,
  dateOfBirth,
  gender,
  occupation
) {
  return `${firstName} ${lastName}`
}

// Code Smell: Too complex function (high cyclomatic complexity)
export function complexLogic(a, b, c, d, e) {
  if (a > 0) {
    if (b < 10) {
      if (c === "test") {
        if (d !== null) {
          if (e.length > 5) {
            if (a + b > 15) {
              if (c.includes("x")) {
                if (d.value > 100) {
                  if (e[0] === "a") {
                    return "too nested"
                  } else {
                    return "else branch"
                  }
                } else {
                  return "another else"
                }
              }
            }
          }
        }
      }
    }
  }
  return "default"
}

// Code Smell: Empty catch block
export function riskyOperation() {
  try {
    dangerousFunction()
  } catch (error) {
    // Silently ignore errors - bad practice
  }
}

// Code Smell: Magic numbers
export function calculatePrice(quantity) {
  return quantity * 19.99 // What is 19.99?
}

// Code Smell: Long function (should be < 50 lines)
export function veryLongFunction() {
  const step1 = "do something"
  const step2 = "do something else"
  const step3 = "do another thing"
  const step4 = "continue processing"
  const step5 = "more processing"
  const step6 = "even more"
  const step7 = "keep going"
  const step8 = "almost done"
  const step9 = "final step"
  const step10 = "one more"
  const step11 = "another one"
  const step12 = "last step"
  const step13 = "really last"
  const step14 = "final"
  const step15 = "done"
  return step1 + step2 + step3 + step4 + step5 + step6 + step7 + step8 + step9 + step10 + step11 + step12 + step13 + step14 + step15
}

