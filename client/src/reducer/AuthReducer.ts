import {
  API_FAILURE,
  API_PENDING,
  API_SUCCESS,
  RESET_INITIAL_STATE,
  VALIDATION_ERROR,
  CUSTOM_ERROR,
} from "../constants/api";

export const authInitialState = {
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
  data: null,
};

export const authActions = {
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
  register: (data) => async (dispatch) => {
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
      await registerAPI(data).then((response) => {
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
        // @ts-ignore
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
  verify: (data) => async (dispatch) => {
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
      await verifyAPI(data).then((response) => {
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
        // @ts-ignore
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
  verifyMobileOTP: (data) => async (dispatch) => {
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
      await verifyOtpMobileAPI(data).then((response) => {
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
  verifyOTP: (data) => async (dispatch) => {
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
      await verifyOtpAPI(data).then((response) => {
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
export const authReducer = (state, action) => {
  const { payload, type, message } = action;
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
        verifyOTP: payload.verifyOTP,
        resendOTP: payload.resendOTP,
        successVerifiedOTP: false,
        successResendOTP: false,
      };
    case API_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorType: payload.type,
        errorMessage: message || payload.message,
        verifyOTP: payload.verifyOTP,
        resendOTP: payload.resendOTP,
        successVerifiedOTP: false,
        successResendOTP: false,
      };
    case API_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        successMessage: payload.message,
        data: payload.data,
        verifyOTP: payload.verifyOTP,
        resendOTP: payload.resendOTP,
        successVerifiedOTP: payload.successVerifiedOTP,
        successResendOTP: payload.successResendOTP,
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
        verifyOTP: false,
        resendOTP: false,
        successVerifiedOTP: false,
        successResendOTP: false,
      };
    default:
      return state;
  }
};
