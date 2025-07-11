import { loginAPI, verifyOtpLoginAPI, resendOtpAPI } from "../api/loginAPI";
import {
  API_FAILURE,
  API_PENDING,
  API_SUCCESS,
  CUSTOM_ERROR,
  RESET_INITIAL_STATE,
  VALIDATION_ERROR,
} from "../constants/api";

export const loginInitialState = {
  loading: false,
  verifyOTP: false,
  resendOTP: false,
  error: false,
  errorType: "",
  errorMessage: "",
  success: false,
  successVerifiedOTP: false,
  successResendOTP: false,
  successMessage: "",
  data: [],
};

export const loginActions = {
  // @ts-ignore
  login: (data) => async (dispatch) => {
    dispatch({
      type: API_PENDING,
      payload: {
        verifyOTP: false,
        resendOTP: false,
        successVerifiedOTP: false,
        successResendOTP: false,
      },
    });
    try {
      // @ts-ignore
      await loginAPI(data).then((response) => {
        if (!response) {
          dispatch({
            type: API_FAILURE,
            message: "No response",
            payload: {
              payload: {
                verifyOTP: false,
                resendOTP: false,
                successVerifiedOTP: false,
                successResendOTP: false,
              },
            },
          });
        } else {
          const { data } = response;
          dispatch({
            type: API_SUCCESS,
            message: response.message,
            payload: {
              ...data,
              successVerifiedOTP: false,
              successResendOTP: false,
              verifyOTP: false,
              resendOTP: false,
            },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      // @ts-ignore
      if (error.type === VALIDATION_ERROR) {
        dispatch({
          type: API_FAILURE,
          message: message,
          payload: {
            type: API_FAILURE,
            message,
            verifyOTP: false,
            resendOTP: false,
            successVerifiedOTP: false,
            successResendOTP: false,
          },
        });
        // @ts-ignore
      } else if (error.type === CUSTOM_ERROR) {
        dispatch({
          type: API_FAILURE,
          message: message,
          payload: {
            type: API_FAILURE,
            message,
            verifyOTP: false,
            resendOTP: false,
            successVerifiedOTP: false,
            successResendOTP: false,
          },
        });
      }
    }
  },
  // @ts-ignore
  verifyOTPLogin: (data) => async (dispatch) => {
    dispatch({
      type: API_PENDING,
      payload: {
        verifyOTP: true,
        resendOTP: false,
        successVerifiedOTP: false,
        successResendOTP: false,
      },
    });
    try {
      // @ts-ignore
      await verifyOtpLoginAPI(data).then((response) => {
        if (!response) {
          dispatch({
            type: API_FAILURE,
            message: "No response",
            payload: {
              verifyOTP: false,
              resendOTP: false,
              successVerifiedOTP: false,
              successResendOTP: false,
            },
          });
        } else {
          const { data } = response;
          dispatch({
            type: API_SUCCESS,
            message: response.message,
            payload: {
              ...data,
              successVerifiedOTP: true,
              successResendOTP: false,
              verifyOTP: false,
              resendOTP: false,
            },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      // @ts-ignore
      if (error.type === VALIDATION_ERROR) {
        dispatch({
          type: API_FAILURE,
          message: message,
          payload: {
            type: API_FAILURE,
            message,
            verifyOTP: false,
            resendOTP: false,
            successVerifiedOTP: false,
            successResendOTP: false,
          },
        });
        // @ts-ignore
      } else if (error.type === CUSTOM_ERROR) {
        dispatch({
          type: API_FAILURE,
          message: message,
          payload: {
            type: API_FAILURE,
            message,
            verifyOTP: false,
            resendOTP: false,
            successVerifiedOTP: false,
            successResendOTP: false,
          },
        });
      }
    }
  },
  // @ts-ignore
  resendOTP: (data) => async (dispatch) => {
    dispatch({
      type: API_PENDING,
      payload: {
        verifyOTP: false,
        resendOTP: true,
        successVerifiedOTP: false,
        successResendOTP: false,
      },
    });
    try {
      // @ts-ignore
      await resendOtpAPI(data).then((response) => {
        if (!response) {
          dispatch({
            type: API_FAILURE,
            message: "No response",
            payload: {
              verifyOTP: false,
              resendOTP: false,
              successVerifiedOTP: false,
              successResendOTP: false,
            },
          });
        } else {
          const { data } = response;
          dispatch({
            type: API_SUCCESS,
            message: response.message,
            payload: {
              ...data,
              successVerifiedOTP: false,
              successResendOTP: true,
              verifyOTP: false,
              resendOTP: false,
            },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      // @ts-ignore
      if (error.type === VALIDATION_ERROR) {
        dispatch({
          type: API_FAILURE,
          message: message,
          payload: {
            type: API_FAILURE,
            message,
            verifyOTP: false,
            resendOTP: false,
            successVerifiedOTP: false,
            successResendOTP: false,
          },
        });
        // @ts-ignore
      } else if (error.type === CUSTOM_ERROR) {
        dispatch({
          type: API_FAILURE,
          message: message,
          payload: {
            type: API_FAILURE,
            message,
            verifyOTP: false,
            resendOTP: false,
            successVerifiedOTP: false,
            successResendOTP: false,
          },
        });
      }
    }
  },
};

// @ts-ignore
export const loginReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case API_PENDING:
      return {
        ...state,
        loading: true,
        verifyOTP: payload.verifyOTP,
        resendOTP: payload.resendOTP,

        error: false,
        errorType: "",
        errorMessage: "",

        success: false,
        successVerifiedOTP: false,
        successResendOTP: false,

        successMessage: "",
      };
    case API_FAILURE:
      return {
        ...state,
        loading: false,
        verifyOTP: false,
        resendOTP: false,

        error: true,
        errorType: payload.type,
        errorMessage: payload.message,
      };
    case API_SUCCESS: {
      return {
        ...state,
        loading: false,
        verifyOTP: false,
        resendOTP: false,

        success: true,
        successVerifiedOTP: payload.successVerifiedOTP,
        successResendOTP: payload.successResendOTP,
        successMessage: payload.message,
        data: { ...payload.data },
      };
    }
    case RESET_INITIAL_STATE:
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
        successVerifiedOTP: false,
        successResendOTP: false,

        successMessage: "",
        errorMessage: "",
      };
    default:
      return state;
  }
};
