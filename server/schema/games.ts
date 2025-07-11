const getGames = {
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

const openGameMatch = {
  body: {
    type: "object",
    properties: {
      game: { type: "string" },
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
          default: "A game match created successfully!",
        },
      },
    },
  },
};

const gameMatch = {
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

const addGameDeposit = {
  body: {
    type: "object",
    properties: {
      creditType: { type: "string" },
      credit: { type: "number" },
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
          default: "Player attempting to deposit",
        },
      },
    },
  },
};

const addGameWithdraw = {
  body: {
    type: "object",
    properties: {
      creditType: { type: "string" },
      credit: { type: "number" },
      accountNumber : { type: "string" },
      accountId: { type: "string" },
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
          default: "Player attempting to withdraw",
        },
      },
    },
  },
};

const getGameTransactions = {
  querystring: {
    type: "object",
    properties: {
      filter: { type: "string" },
      page: { type: "integer" },
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

export default {
  getGames,
  openGameMatch,
  gameMatch,
  addGameDeposit,
  addGameWithdraw,
  getGameTransactions,
};
