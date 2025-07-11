import { hasValue } from "../../../common/gameutils";
import useAxios from "./axios";
import { getCookie } from "./cookie";

export async function addBalance(load) {
  const serverPort = import.meta.env.VITE_SERVER_PORT;
  let url = `http://localhost:${serverPort}/api/v1/admin/user/balance`;
  return await useAxios.put(
    url,
    { load: load },
    {
      "Content-Type": "application/json",
      Authorization: getCookie("token"), // Replace 'your_token_here' with your actual token
    }
  );
}

export async function getBalance() {
  const serverPort = import.meta.env.VITE_SERVER_PORT;
  return await useAxios.get(
    `http://localhost:${serverPort}/api/v1/admin/user/balance`
  );
}

/**
 * Will return either with uuid(for testing) or with token when returning url
 */
export function getRequiredUrl() {
/* 
  const urlParams = new URLSearchParams(window.location.search);
  let uuid = urlParams.get("uuid");
  if (hasValue(uuid)) {
    return `ws://localhost:${serverPort}/websocket?uuid=${uuid}`;
  }
   
   
  const authToken = getCookie('token');
  if (hasValue(authToken)) {
    return `ws://localhost:${serverPort}/websocket?token=${authToken}`;
  }
*/
  const url = getWsUrl();
  console.log(`${url}`);
  return url;
}

export function isLoginValid() {
  const urlParams = new URLSearchParams(window.location.search);
  let uuid = urlParams.get("uuid");
  return (getCookie('token') !== null || hasValue(uuid))
}

function getWsUrl() {
  const authToken = getCookie('token');
  if (!hasValue(authToken)) {
    return null;
  }

  const env = import.meta.env.VITE_ENV;
  switch (env) {
    case "local":
      return `${import.meta.env.VITE_LOCAL_SOCKET}/api/websocket?token=${authToken}`
      break;
    case "dev":
      return `${import.meta.env.VITE_DEV_SOCKET}/api/websocket?token=${authToken}`
      break;
    case "staging":
      return `${import.meta.env.VITE_STAGING_SOCKET}/api/websocket?token=${authToken}`
      break;
    case "live":
      return `${import.meta.env.VITE_LIVE_SOCKET}/api/websocket?token=${authToken}`
      break;
    default:
      break;
  }
}

function getApi() {
  const env = import.meta.env.VITE_ENV;
  switch (env) {
    case "local":
      return import.meta.env.VITE_LOCAL_API
      break;
    default:
      break;
  }
}


