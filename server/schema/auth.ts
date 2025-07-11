const loginMobileSchema = {
  body: {
    type: "object",
    properties: {
      mobile: { type: "string" },
    },
    required: ["mobile"],
  },
};

const registerMobileSchema = {
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      birthdate: { type: "string", format: "date" },
      mobile: { type: "string" },
    },
    required: ["mobile"],
  },
};

const verifyMobileSchema = {
  body: {
    type: "object",
    properties: {
      mobile: { type: "string" },
    },
    required: ["mobile"],
  },
};

const verifyOTPSchema = {
  body: {
    type: "object",
    properties: {
      id: { type: "string" },
      otp: { type: "string" },
    },
    required: ["id", "otp"],
  },
};

const verifyMobileOTPSchema = {
  body: {
    type: "object",
    properties: {
      id: { type: "string" },
      otp: { type: "string" },
    },
    required: ["id", "otp"],
  },
};

const resendOTPSchema = {
  body: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
};

export default {
  loginMobileSchema,
  registerMobileSchema,
  verifyMobileSchema,
  verifyOTPSchema,
  verifyMobileOTPSchema,
  resendOTPSchema,
};
