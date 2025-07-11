const getAllUsers = {
  querystring: {
    type: "object",
    properties: {
      page: { type: "integer", minimum: 0 },
      size: { type: "integer", minimum: 0 },
      sort: { type: "string", pattern: "^[a-zA-Z_]+,(asc|desc)$" },
      filter: { type: "string" },
      status: { type: "string", enum: ["active", "inactive"] },
    },
    required: ["page", "size", "sort"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          uuid: { type: "string", format: "uuid" },
          mobile: { type: "string" },
          gender: { type: "string" },
          birthdate: { type: "string", format: "date" },
          email: { type: "string" },
          address: { type: "string" },
          role: { type: "string" },
          isMobileVerified: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

const addUser = {
  body: {
    type: "object",
    properties: {
      mobile: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      role: { type: "string" },
    },
    required: ["mobile", "firstName", "lastName", "email", "role"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User added successfully!" },
      },
    },
  },
};

const updateUser = {
  params: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" }, // Define id as a UUID string
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      mobile: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: {
        anyOf: [{ type: "string", format: "email" }, { type: "null" }],
      },
      role: { type: "string" },
      userGroups: {
        type: "array",
        items: {
          type: "object",
          properties: {
            fullName: { type: "string" },
            id: { type: "integer" },
          },
          required: ["fullName", "id"],
        },
      },
    },
    required: ["mobile"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User updated successfully!" },
      },
    },
  },
};

const uploadUserImage = {
  params: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" }, // Define id as a UUID string
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      image: { type: "string", format: "binary" }, // Use format: 'binary' for file uploads
    },
    required: ["image"],
  },
};

const deleteUser = {
  params: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" }, // Define id as a UUID string
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User deleted successfully!" },
      },
    },
  },
};

const restoreUser = {
  params: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" }, // Define id as a UUID string
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User restore successfully!" },
      },
    },
  },
};


const getUserProfile = {
  response: {
    200: {
      type: "object",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        gender: { type: "string" },
        birthdate: { type: "string", format: "date" },
        mobile: { type: "string" },
        email: { type: "string" },
        address: { type: "string" },
      },
    },
  },
};

const updateUserProfile = {
  body: {
    type: "object",
    properties: {
      mobile: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: {
        anyOf: [{ type: "string", format: "email" }, { type: "null" }],
      },
      gender: {
        anyOf: [{ type: "string" }, { type: "null" }],
      },
      birthdate: {
        anyOf: [{ type: "string", format: "date" }, { type: "null" }],
      },
      address: {
        anyOf: [{ type: "string" }, { type: "null" }],
      },
      govtType: { type: "string" },
      govtId: { type: "string" },
    },
    required: ["mobile"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User updated successfully!" },
      },
    },
  },
};

const generateReferral = {
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User updated successfully!" },
      },
    },
  },
};

const kycFinish = {
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User updated successfully!" },
      },
    },
  },
};

const approveOrDeactiveVerifier = {
  params: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" }, // Define id as a UUID string
    },
  },
  body: {
    type: "object",
    properties: {
      type: { type: "string" },
      reason: {
        anyOf: [{ type: "string" }, { type: "null" }],
      },
    },
    required: ["type"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: {
          type: "string",
          default: "User Player is successfully approved!",
        },
      },
    },
  },
};

const checkUser = {
  params: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
};

const addCredit = {
  body: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      credit: { type: "number" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: {
          type: "string",
          default: "User add credit to ${playerName} (player)  successfully!",
        },
      },
    },
  },
};

const getPaymentCards = {
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: {
          type: "string",
          default: "The cards is successfuly fetched!",
        },
      },
    },
  },
};

const addPaymentCard = {
  body: {
    type: "object",
    properties: {
      paymentType: { type: "string" },
      mobile: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: {
          type: "string",
          default: "The card is successfuly added!",
        },
      },
    },
  },
};

const authPincode = {
  body: {
    type: "object",
    properties: {
      pincode: { type: "string" },
      accountNumber: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: {
          type: "string",
          default: "The pincode is successfuly authenticated!",
        },
      },
    },
  },
};



const getBalance = {
  response: {
    200: {
      type: "object",
      properties: {
        balance: { type: "number" },
      },
    },
  },
};

const addBalance = {
  body: {
    type: "object",
    properties: {
      load: { type: "number" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User checked successfully!" },
      },
    },
  },
};

const getAllUsersForOptions = {
  response: {
    200: {
      type: "object",
      properties: {
        fullname: { type: "string" },
        id: { type: "integer" },
        message: {
          type: "string",
          default: "User Options fetch successfully!",
        },
      },
    },
  },
};

const logoutUserSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "User updated successfully!" },
      },
    },
  },
};

const createPasscode = {
  body: {
    type: "object",
    properties: {
      passcode: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        status: { type: "string", default: "API_SUCCESS" },
        data: { type: "object", default: {} },
        message: { type: "string", default: "Creating Passcode successfully!" },
      },
    },
  },
}; 



export default {
  getAllUsers,
  addUser,
  updateUser,
  uploadUserImage,
  deleteUser,
  restoreUser,
  getUserProfile,
  updateUserProfile,
  generateReferral,
  kycFinish,
  approveOrDeactiveVerifier,
  checkUser,
  getAllUsersForOptions,
  getBalance,
  addBalance,
  addCredit,
  getPaymentCards,
  addPaymentCard,
  authPincode,
  logoutUserSchema,
  createPasscode
};
