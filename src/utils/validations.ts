export const validateLoginFields = (
  email?: string,
  password?: string,
): boolean => {
  return !!(email && email.includes('@') && password && password.length > 8)
}

export const validateSignupFields = (
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
): boolean => {
  return !!(
    firstName &&
    lastName &&
    email &&
    email.includes('@') &&
    password &&
    password.length > 8
  )
}
