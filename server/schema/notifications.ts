const getNotifications = {
  querystring: {
    type: "object",
    properties: {
      filter: { type: "string" },
      page: { type: "integer" },
      type: { type: "string" },
      size: { type: "integer", minimum: 1 },
      sort: { type: "string" }, // Define 'sort' as a string parameter
    },
    required: ["page", "size"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {},
      },
    },
  },
};

const getNotificationsCustom = {
  querystring: {
    type: "object",
    properties: {},
    required: [],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {},
      },
    },
  },
};

const readNotification = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" }, // Define id as a UUID string
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      isRead: { type: "boolean" }, // Use format: 'binary' for file uploads
    },
    required: ["isRead"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {},
      },
    },
  },
};

export default {
  getNotifications,
  readNotification,
  getNotificationsCustom,
};
