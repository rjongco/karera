import {
  API_FAILURE,
  API_PENDING,
  API_SUCCESS,
  RESET_INITIAL_STATE,
  VALIDATION_ERROR,
  CUSTOM_ERROR,
} from "../constants/api";

import {
  addUserAPI,
  updateUserAPI,
  deleteUserAPI,
  approveOrDeactiveVerifierAPI,
  addCreditAPI,
  restoreUserAPI,
} from "../api/userManagementAPI";

export const userManagementInitialState = {
  loading: false,
  error: false,
  errorType: "",
  errorMessage: "",
  success: false,
  successMessage: "",
  data: [],
};

export const userManagementActions = {
  addUser: (data: any) => async (dispatch: any) => {
    dispatch({ type: API_PENDING });

    try {
      await addUserAPI(data).then((response) => {
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
      dispatch({ type: API_FAILURE, payload: error });
      console.error(error);
    }
  },

  updateUser: (data: any) => async (dispatch: any) => {
    dispatch({ type: API_PENDING });

    try {
      await updateUserAPI(data).then((response) => {
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
      dispatch({ type: API_FAILURE, payload: error });
      console.error(error);
    }
  },

  deleteUser: (id: any) => async (dispatch: any) => {
    dispatch({ type: API_PENDING });

    try {
      await deleteUserAPI(id).then((response: any) => {
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
      dispatch({ type: API_FAILURE, payload: error });
      console.error(error);
    }
  },

  restoreUser: (id: any) => async (dispatch: any) => {
    dispatch({ type: API_PENDING });

    try {
      await restoreUserAPI(id).then((response: any) => {
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
      dispatch({ type: API_FAILURE, payload: error });
      console.error(error);
    }
  },

  approveOrDeactiveVerifier: (data: any) => async (dispatch: any) => {
    dispatch({ type: API_PENDING });

    try {
      await approveOrDeactiveVerifierAPI(data).then((response: any) => {
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
      dispatch({ type: API_FAILURE, payload: error });
      console.error(error);
    }
  },
  addCredit: (data: any) => async (dispatch: any) => {
    try {
      await addCreditAPI(data).then((response: any) => {
        if (!response) {
        } else {
          const { message } = response;
          dispatch({
            type: API_SUCCESS,
            payload: {
              message,
            },
          });
        }
      });
    } catch (error) {
      dispatch({ type: API_FAILURE, payload: error });
      console.error(error);
    }
  },
};

// @ts-ignore
export const userManagementReducer = (state, action) => {
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
