import useAxios from "../utils/axios";

export const verifyAPI = async (data: any) => {
  return useAxios
    .post(`/auth/verify`, data)
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

export const verifyOtpMobileAPI = async (data: any) => {
  return useAxios
    .post(`/auth/verifyMobileOTP`, data)
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
