const EMAIL_VALID = `Field should contain a valid e-mail`;
const NAME_VALID = `Field should contain a valid name`;
const USERNAME_VALID = `Field should contain a valid username`;
const PASSWORD_MATCH = `Passwords must match`;
const PASSWORD_VALID = `Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character`;
const FIELD_IS_REQUIRED = (field: string) => `The ${field} field is required`;
const MAX_CHARACTER = (num: number) =>
  `Maximum value must be ${num} characters`;
const MOBILE_VALID = `Mobile number is not valid`;
const OTP_NUMBER_ONLY = `OTP should contain a number only`;

export {
  NAME_VALID,
  EMAIL_VALID,
  PASSWORD_MATCH,
  MAX_CHARACTER,
  FIELD_IS_REQUIRED,
  PASSWORD_VALID,
  MOBILE_VALID,
  OTP_NUMBER_ONLY,
  USERNAME_VALID,
};
