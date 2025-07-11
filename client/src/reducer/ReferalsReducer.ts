import {
  API_FAILURE,
  API_PENDING,
  API_SUCCESS,
  RESET_INITIAL_STATE,
} from "../constants/api";

export const referralsInitialState = {
  loading: false,
  error: false,
  errorType: "",
  errorMessage: "",
  success: false,
  successMessage: "",
  data: [],
};

export const referralsActions = {};

// @ts-ignore
export const referralsReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case API_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorType: "",
        errorMessage: "",
        success: false,
        successMessage: "",
      };
    case API_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorType: payload.type,
        errorMessage: payload.message,
      };
    case API_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        successMessage: payload.message,
        referrals: { ...payload.data },
      };
    }
    case RESET_INITIAL_STATE:
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
        successMessage: "",
        errorMessage: "",
      };
    default:
      return state;
  }
};
