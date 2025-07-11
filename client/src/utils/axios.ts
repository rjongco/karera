import axios from "axios";
import { getCookie } from "../utils/cookie";
import { AUTH_ROUTES_PATH } from "../utils/routes";
import { API_URL, API_URL_PREFIX } from "../constants";

const baseURL = `${API_URL}/${API_URL_PREFIX}`;

const useAxios = axios.create({
  baseURL,
  // timeout: 10000
  timeout: 1000 * 30,
});

useAxios.interceptors.request.use(
  (config) => {
    // console.log(window.location.pathname);
    // console.log(AUTH_ROUTES_PATH);
    // console.log(AUTH_ROUTES_PATH.includes(window.location.pathname));
    // @ts-ignore
    if (AUTH_ROUTES_PATH.includes(window.location.pathname)) {
      const token = getCookie("token");
      // const token = sessionStorage.getItem("token");
      if (!token) {
        window.location.href = window.location.origin + "/admin/logout";
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to logout page
      window.location.href = window.location.origin + "/admin/logout";
    }
    return Promise.reject(error);
  }
);

useAxios.interceptors.response.use(
  (response) => {
    // Return the response if no error
    return response;
  },
  (error) => {
    // Handle error globally

    if (
      error.response &&
      error.response.status === 401 &&
      // @ts-ignore
      AUTH_ROUTES_PATH.includes(window.location.pathname)
    ) {
      // Redirect to logout page
      window.location.href = window.location.origin + "/admin/logout";
    }

    // Rethrow the error to maintain the error handling flow
    return Promise.reject(error);
  }
);
export default useAxios;
