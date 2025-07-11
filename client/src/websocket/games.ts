import { SOCKET_URL } from "../constants";
import createWebSocket from "../utils/websocket";

export const openGameMatchWebSocket = async (param: any) => {
  const ws = await createWebSocket(`wss://${SOCKET_URL}/admin/game/match/open`);
  await ws.connect(param);
  return ws;
};

export const betGameMatchWebSocket = async (param: any) => {
  const ws = await createWebSocket(`wss://${SOCKET_URL}/admin/game/match/bet`);
  await ws.connect(param);
  return ws;
};

export const getGameMatchWebSocket = async (param: any) => {
  const ws = await createWebSocket(`wss://${SOCKET_URL}/admin/game/match`);
  await ws.connect(param);
  return ws;
};
