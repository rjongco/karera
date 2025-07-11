import {
  API_FAILURE,
  API_PENDING,
  API_SUCCESS,
  RESET_INITIAL_STATE,
} from "../constants/api";
import {
  getGameMatchWebSocket,
  openGameMatchWebSocket,
  betGameMatchWebSocket,
} from "../websocket/games";

export const gameInitialState = {
  loading: false,
  error: false,
  errorType: "",
  errorMessage: "",
  success: false,
  successMessage: "",
  data: {},
};

export const gameActions = {
  openGameMatch: (data: any) => async (dispatch: any) => {
    dispatch({ type: API_PENDING });

    const ws = await openGameMatchWebSocket(data);

    ws.onLoading(() => {
      dispatch({ type: API_PENDING });
    });

    ws.onMessage((res) => {
      const { data: gameMatch, message } = res;
      const data = (gameMatch && JSON.parse(gameMatch)) || {};
      dispatch({
        type: API_SUCCESS,
        payload: {
          data,
          message,
        },
      });
    });

    ws.onError((message) => {
      dispatch({ type: API_FAILURE, payload: { message } });
    });

    //  @ts-ignore
    // ws.close();
  },

  betGameMatch: (data: any) => async (dispatch: any) => {
    dispatch({ type: API_PENDING });

    const ws = await betGameMatchWebSocket(data);

    ws.onLoading(() => {
      dispatch({ type: API_PENDING });
    });

    ws.onMessage((res: any) => {
      const { data: gameMatch, message } = res;
      const data = (gameMatch && JSON.parse(gameMatch)) || {};

      dispatch({
        type: API_SUCCESS,
        payload: {
          data,
          message,
        },
      });
    });

    ws.onError((message: any) => {
      dispatch({ type: API_FAILURE, payload: { message } });
    });
  },

  getGameMatch: (data: any) => async (dispatch: any) => {
    dispatch({ type: API_PENDING });

    const ws = await getGameMatchWebSocket(data);

    ws.onLoading(() => {
      dispatch({ type: API_PENDING });
    });

    ws.onMessage((res) => {
      const { data: gameMatch, message } = res;
      const data = (gameMatch && JSON.parse(gameMatch)) || {};

      dispatch({
        type: API_SUCCESS,
        payload: {
          data,
          message,
        },
      });
    });

    ws.onError((message) => {
      dispatch({ type: API_FAILURE, payload: { message } });
    });
  },
};

// @ts-ignore
export const gameReducer = (state, action) => {
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
