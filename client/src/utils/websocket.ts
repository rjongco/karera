import { ERROR } from "../constants/api";
import { getCookie } from "./cookie";

interface WebSocketFunctions {
  onMessage: (callback: (data: any) => void) => void; // Define onMessage as a function that accepts a callback
  close: () => void;
  onLoading: (callback: (data: boolean) => void) => void;
  onError: (callback: (data: any) => void) => void;
  connect: (data?: any) => void;
}

const createWebSocket = (url: any): WebSocketFunctions => {
  let socket: WebSocket | null = null;
  let messageCallback: ((data: any) => void) | null = null; // Callback to handle incoming messages
  let errorCallback: (data: any) => void; // Callback to handle incoming messages
  let loadingCallback: (data: boolean) => void; // Callback to handle incoming messages

  const connect = (data?: any) => {
    if (data) {
      const { game, matchId, matchStatus, message, actions } = data;
      const token = getCookie("token");
      socket = new WebSocket(
        `${url}?actions=${actions}&game=${game}&matchId=${matchId}&matchStatus=${matchStatus}&token=${token}`
      );

      socket.onopen = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(message);
        } else {
          if (errorCallback) {
            return errorCallback;
          }
        }
        if (loadingCallback) {
          loadingCallback(true);
        }
      };

      socket.onmessage = (event: MessageEvent) => {
        console.log(event.data);
        const json = JSON.parse(event.data);
        if (json.status === ERROR) {
          errorCallback(json);
        } else {
          if (messageCallback) {
            messageCallback(json);
          }
        }
      };

      socket.onclose = (event: CloseEvent) => {
        setTimeout(connect, 5000); // Retry connection after 5 seconds
      };

      socket.onerror = (error: Event) => {
        errorCallback(error);
      };
    }
  };

  const onLoading = (callback: (data: boolean) => void) => {
    loadingCallback = callback;
  };

  const onMessage = (callback: (data: any) => void) => {
    messageCallback = callback;
  };

  const onError = (callback: (data: any) => void) => {
    errorCallback = callback;
  };

  const close = () => {
    if (socket) {
      socket.close();
    }
  };

  connect();

  return {
    onMessage,
    close,
    onLoading,
    onError,
    connect,
  };
};

export default createWebSocket;
