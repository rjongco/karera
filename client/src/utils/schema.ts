import * as yup from "yup";
import {
  FIELD_IS_REQUIRED,
  MOBILE_VALID,
  EMAIL_VALID,
  USERNAME_VALID,
  OTP_NUMBER_ONLY,
  NAME_VALID,
  PASSWORD_VALID,
} from "../constants/validation";

export const AuthSchema = yup.object({
  mobile: yup
    .string()
    .trim()
    // .matches(/^\+(?:[0-9] ?){12,14}[0-9]$/, MOBILE_VALID)
    .matches(/^(09|\+639)\d{9}$/, MOBILE_VALID)
    .required(FIELD_IS_REQUIRED("Mobile No.")),
});

export const AuthSchemaLogin = yup.object({
  mobile: yup
    .string()
    .trim()
    // .matches(/^\+(?:[0-9] ?){12,14}[0-9]$/, MOBILE_VALID)
    .matches(/^(09|\+639)\d{9}$/, MOBILE_VALID)
    .required(FIELD_IS_REQUIRED("Mobile No.")),
});

export const AuthSchemaRegister = yup.object({
  firstName: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("First Name"))
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  lastName: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("Last Name"))
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  birthdate: yup
    .date()
    .nullable()
    .max(new Date(), "Birthdate must be in the past")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 21)),
      "You must be at least 21 years old"
    ),
  mobile: yup
    .string()
    .trim()
    // .matches(/^\+(?:[0-9] ?){12,14}[0-9]$/, MOBILE_VALID)
    .matches(/^(09|\+639)\d{9}$/, MOBILE_VALID)
    .required(FIELD_IS_REQUIRED("Mobile No.")),
});

export const OTPSchema = yup.object({
  otp: yup
    .string()
    .trim()
    // .matches(/^\+(?:[0-9] ?){12,14}[0-9]$/, MOBILE_VALID)
    .matches(/^[0-9]*$$/, OTP_NUMBER_ONLY)
    .required(FIELD_IS_REQUIRED("OTP")),
});

export const LoginSchema = yup.object({
  email: yup.string().required(FIELD_IS_REQUIRED("Email")),
  password: yup.string().required(FIELD_IS_REQUIRED("Password")),
});

export const UserManagementSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("First Name"))
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  lastName: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("Last Name"))

    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  email: yup
    .string()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, EMAIL_VALID),
  role: yup.string().required(FIELD_IS_REQUIRED("Role")),
  mobile: yup
    .string()
    .trim()
    // .matches(/^\+(?:[0-9] ?){12,14}[0-9]$/, MOBILE_VALID)
    .matches(/^(09|\+639)\d{9}$/, MOBILE_VALID)
    .required(FIELD_IS_REQUIRED("Mobile No.")),
});

export const UserManagementUpdateSchema = yup.object({
  firstName: yup
    .string()
    .nullable()
    .trim()
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  lastName: yup
    .string()
    .nullable()
    .trim()
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  email: yup
    .string()
    .nullable()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, EMAIL_VALID),
  role: yup.string().required(FIELD_IS_REQUIRED("Role")).nullable(),
  mobile: yup
    .string()
    .trim()
    // .matches(/^\+(?:[0-9] ?){12,14}[0-9]$/, MOBILE_VALID)
    .matches(/^(09|\+639)\d{9}$/, MOBILE_VALID)
    .required(FIELD_IS_REQUIRED("Mobile No.")),
  commission: yup
    .number()
    .typeError("Commission percentage must be a number")
    .nullable()
    .min(0, "Commission percentage must be greater than or equal to 0")
    .max(100, "Commission percentage must be less than or equal to 100"),
});

export const KYCSchema = yup.object({
  govtId: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("Gov't ID"))
    .max(50, "FirstName cannot exceed 50 characters"),
  firstName: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("First Name"))
    .max(200, "FirstName cannot exceed 100 characters")
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  lastName: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("Last Name"))
    .max(200, "LastName cannot exceed 100 characters")
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  email: yup
    .string()
    .nullable()
    .trim()
    .max(150, "Email cannot exceed 100 characters")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, EMAIL_VALID),
  gender: yup
    .number()
    .notOneOf([0], FIELD_IS_REQUIRED("Gender"))
    .typeError(FIELD_IS_REQUIRED("Gender")),
  birthdate: yup
    .date()
    .nullable()
    .typeError("Birthdate must be a valid date")
    .max(new Date(), "Birthdate must be in the past")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 21)),
      "You must be at least 21 years old"
    ),
  placeOfBirth: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("Place of Birth"))
    .max(150, "Place of Birth cannot exceed 100 characters"),
  nationalities: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("Nationality"))
    .max(150, "Nationality cannot exceed 150 characters"),
  natureOfWork: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("Nature of Work"))
    .max(150, "Nature of Work cannot exceed 200 characters"),
  sourceOfIncome: yup
    .string()
    .trim()
    .required(FIELD_IS_REQUIRED("Source of Income"))
    .max(150, "Source Of Income cannot exceed 200 characters"),
  address: yup
    .string()
    .max(200, "Address cannot exceed 100 characters")
    .nullable(),
  currentAddresses: yup.object({
    street: yup.string().required(FIELD_IS_REQUIRED("Present Street")),
    barangayId: yup
      .mixed()
      .test(
        "is-number-or-object",
        "Field must be either a number or an object with an id",
        function (value) {
          if (value === undefined || value === null || value === "") {
            return true;
          }
          if (typeof value === "number") {
            return true;
          }
          if (typeof value === "object" && value !== null && "id" in value) {
            return true;
          }
          return false;
        }
      )
      .nullable(),
    cityId: yup
      .mixed()
      .test(
        "is-number-or-object",
        "Field must be either a number or an object with an id",
        function (value) {
          if (value === undefined || value === null || value === "") {
            return true;
          }
          if (typeof value === "number") {
            return true;
          }
          if (typeof value === "object" && value !== null && "id" in value) {
            return true;
          }
          return false;
        }
      )
      .required(FIELD_IS_REQUIRED("Present City")),
    provinceId: yup
      .mixed()
      .test(
        "is-number-or-object",
        "Field must be either a number or an object with an id",
        function (value) {
          if (value === undefined || value === null || value === "") {
            return true;
          }
          if (typeof value === "number") {
            return true;
          }
          if (typeof value === "object" && value !== null && "id" in value) {
            return true;
          }
          return false;
        }
      )
      .required(FIELD_IS_REQUIRED("Present Province")),
    zipCode: yup.number().required(FIELD_IS_REQUIRED("Present Zip Code")),
  }),
  permanentAddresses: yup.object({
    street: yup.string().required(FIELD_IS_REQUIRED("Permanent Street")),
    barangayId: yup
      .mixed()
      .test(
        "is-number-or-object",
        "Field must be either a number or an object with an id",
        function (value) {
          if (value === undefined || value === null || value === "") {
            return true;
          }
          if (typeof value === "number") {
            return true;
          }
          if (typeof value === "object" && value !== null && "id" in value) {
            return true;
          }
          return false;
        }
      )
      .nullable(),
    cityId: yup
      .mixed()
      .test(
        "is-number-or-object",
        "Field must be either a number or an object with an id",
        function (value) {
          if (value === undefined || value === null || value === "") {
            return true;
          }
          if (typeof value === "number") {
            return true;
          }
          if (typeof value === "object" && value !== null && "id" in value) {
            return true;
          }
          return false;
        }
      )
      .required(FIELD_IS_REQUIRED("Present City")),
    provinceId: yup
      .mixed()
      .test(
        "is-number-or-object",
        "Field must be either a number or an object with an id",
        function (value) {
          if (value === undefined || value === null || value === "") {
            return true;
          }
          if (typeof value === "number") {
            return true;
          }
          if (typeof value === "object" && value !== null && "id" in value) {
            return true;
          }
          return false;
        }
      )
      .required(FIELD_IS_REQUIRED("Present Province")),
    zipCode: yup.number().required(FIELD_IS_REQUIRED("Permanent Zip Code")),
  }),
});

export const UserProfileSchema = yup.object({
  firstName: yup
    .string()
    .nullable()
    .trim()
    .max(200, "FirstName cannot exceed 100 characters")
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  lastName: yup
    .string()
    .nullable()
    .trim()
    .max(200, "LastName cannot exceed 100 characters")
    .matches(/^[A-Za-z][A-Za-z\s-]*$/, NAME_VALID),
  email: yup
    .string()
    .nullable()
    .trim()
    .max(150, "Email cannot exceed 100 characters")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, EMAIL_VALID),

  mobile: yup
    .string()
    .trim()
    // .matches(/^\+(?:[0-9] ?){12,14}[0-9]$/, MOBILE_VALID)
    .matches(/^(09|\+639)\d{9}$/, MOBILE_VALID)
    .nullable(),
  // @ts-ignore
  gender: yup.string().nullable(),
  birthdate: yup
    .date()
    .nullable()
    .typeError("Birthdate must be a valid date")
    .max(new Date(), "Birthdate must be in the past")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 21)),
      "You must be at least 21 years old"
    ),
  placeOfBirth: yup
    .string()
    .nullable()
    .trim()
    .max(150, "Place of Birth cannot exceed 100 characters"),
  nationalities: yup
    .string()
    .nullable()
    .trim()
    .max(150, "Nationality cannot exceed 150 characters"),
  natureOfWork: yup
    .string()
    .nullable()
    .trim()
    .max(150, "Nature of Work cannot exceed 200 characters"),
  sourceOfIncome: yup
    .string()
    .nullable()
    .trim()
    .max(150, "Source Of Income cannot exceed 200 characters"),

  address: yup
    .string()
    .max(200, "Address cannot exceed 100 characters")
    .nullable(),
  addressses: yup.object({
    currentAddresses: yup.object({
      street: yup.string().nullable(),
      barangayId: yup.number().nullable(),
      cityId: yup.number().nullable(),
      provinceId: yup.number().nullable(),
      zipCode: yup.number().nullable(),
    }),
    permanentAddresses: yup.object({
      street: yup.string().nullable(),
      barangayId: yup.number().nullable(),
      cityId: yup.number().nullable(),
      provinceId: yup.number().nullable(),
      zipCode: yup.number().nullable(),
    }),
  }),
});

export const UserProfileSchemaMobile = yup.object({
  govTypeMobile: yup
    .string()
    .required(FIELD_IS_REQUIRED("Government ID Type"))
    .test(
      "not-zero-string",
      FIELD_IS_REQUIRED("Government ID Type"),
      (value) => value !== "0"
    ),
});

export const CreditAdminSchema = yup.object({
  credit: yup
    .number()
    .typeError("Balance must be a number")
    .positive("Cannot add an empty credit")
    .test("is-decimal", "Balance must have two decimal places", (value) => {
      if (!value) return false; // Reject empty value
      const decimalPart = value.toString().split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    }),
});

export const CreditPlayerSchema = yup.object({
  outletType: yup.string().trim(),
  outlet: yup.string().trim(),
  credit: yup
    .number()
    .typeError("Balance must be a number")
    .positive("Cannot add an empty credit")
    .test("is-decimal", "Balance must have two decimal places", (value) => {
      if (!value) return false; // Reject empty value
      const decimalPart = value.toString().split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    }),
});

export const gameBettingSchema = yup.object({
  aries: yup.number().typeError("Aries must be a number"),

  cancer: yup.number().typeError("Cancer must be a number"),

  libra: yup.number().typeError("Libra must be a number"),

  capricorn: yup.number().typeError("Capricorn must be a number"),

  taurus: yup.number().typeError("Taurus must be a number"),

  leo: yup.number().typeError("Leo must be a number"),

  scorpio: yup.number().typeError("Scorpio must be a number"),

  aquarius: yup.number().typeError("Aquarius must be a number"),
  gemini: yup.number().typeError("Gemini must be a number"),

  virgo: yup.number().typeError("Virgo must be a number"),

  sagittarius: yup.number().typeError("Sagittarius must be a number"),

  pisces: yup.number().typeError("Pisces must be a number"),
});

export const DepositFormSchema = yup.object({
  paymentType: yup.string().trim().required(FIELD_IS_REQUIRED("Payment Type")),

  depositAmount: yup
    .number()
    .min(1, "Amount must be at least 1")
    .max(1000000, "Amount must be at most 1,000,000")
    .typeError("Deposit amount must be a number"),
  accountNumber:yup.object({
    id: yup.string().required(FIELD_IS_REQUIRED("Mobile No.")),
    name: yup.string().required(FIELD_IS_REQUIRED("Mobile No.")),
  }),
});

export const AddPaymentCardFormSchema = yup.object({
  mobile: yup
    .string()
    .trim()
    // .matches(/^\+(?:[0-9] ?){12,14}[0-9]$/, MOBILE_VALID)
    .matches(/^(09|\+639)\d{9}$/, MOBILE_VALID)
    .required(FIELD_IS_REQUIRED("Mobile No.")),
});

export const WithdrawFormSchema = yup.object({
  paymentType: yup.string().trim().required(FIELD_IS_REQUIRED("Payment Type")),

  withdrawAmount: yup
    .number()
    .min(200, "Amount must be at least 200")
    .max(1000000, "Amount must be at most 1,000,000")
    .typeError("Withdraw amount must be a number"),
});
