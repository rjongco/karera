import useAxios from "../utils/axios";

export const logoutAPI = async () => {
  return useAxios
    .post(`/admin/user/logout`)
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
