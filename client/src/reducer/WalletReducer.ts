import {
  addGameDepositAPI,
  addGameWithdrawAPI,
  addPaymentCardAPI,
  authPinCodeAPI
} from "../api/walletAPI";
import {
  API_FAILURE,
  API_PENDING,
  API_SUCCESS,
  RESET_INITIAL_STATE,
} from "../constants/api";

export const walletInitialState = {
  loading: false,
  error: false,
  errorType: "",
  errorMessage: "",
  success: false,
  successMessage: "",
  data: [],
};

export const walletActions = {
  addGameDeposit: (data: any) => async (dispatch: any) => {
    dispatch({
      type: API_PENDING,
    });

    try {
      await addGameDepositAPI(data).then((response: any) => {
        if (!response) {
        } else {
          const { data, message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              data: { ...data },
              message,
            },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      const type = "";
      dispatch({ type: API_FAILURE, payload: { type, message } });
    }
  },
  addGameWithdraw: (data: any) => async (dispatch: any) => {
    dispatch({
      type: API_PENDING,
    });

    try {
      await addGameWithdrawAPI(data).then((response: any) => {
        if (!response) {
        } else {
          const { data, message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              data: { ...data },
              message,
            },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      const type = "";
      dispatch({ type: API_FAILURE, payload: { type, message } });
    }
  },
  addPaymentCard: (data: any) => async (dispatch: any) => {
    dispatch({
      type: API_PENDING,
    });

    try {
      await addPaymentCardAPI(data).then((response: any) => {
        if (!response) {
        } else {
          const { data, message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              data: { ...data },
              message,
            },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      const type = "";
      dispatch({ type: API_FAILURE, payload: { type, message } });
    }
  },
  authPinCode: (data: any) => async (dispatch: any) => {
    dispatch({
      type: API_PENDING,
    });

    try {
      await authPinCodeAPI(data).then((response: any) => {
        if (!response) {
        } else {
          const { data, message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              data: { ...data },
              message,
            },
          });
        }
      });
    } catch (error) {
      // @ts-ignore
      const message = error.message;
      const type = "";
      dispatch({ type: API_FAILURE, payload: { type, message } });
    }
  },
};

// @ts-ignore
export const walletReducer = (state, action) => {
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
        data: { ...payload.data },
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
