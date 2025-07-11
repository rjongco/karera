import useAxios from "../utils/axios";

export const registerAPI = async (data: any) => {
  return useAxios
    .post(`/auth/register`, data)
    .then((res) => res.data)
    .catch((error) => {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: error.response.data.status,
        type: error.response.data.type,
        message: error.response.data.message,
      };
    });
};
export const verifyOtpAPI = async (data: any) => {
  return useAxios
    .post(`/auth/verifyOTP`, data)
    .then((res) => res.data)
    .catch((error) => {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: error.response.data.status,
        type: error.response.data.type,
        message: error.response.data.message,
      };
    });
};

export const resendOtpAPI = async (data: any) => {
  return useAxios
    .post(`/auth/resendOTP`, data)
    .then((res) => res.data)
    .catch((error) => {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: error.response.data.status,
        type: error.response.data.type,
        message: error.response.data.message,
      };
    });
};
