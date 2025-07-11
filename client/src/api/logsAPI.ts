import useAxios from "../utils/axios";

export const getLogs = async (data: any) => {
  return await useAxios
    .get(`/admin/logs`, data)
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

export const getLogs2 = async (data: any) => {
  return await useAxios
    .get(`/admin/logs${data}`, {
      timeout: 1000 * 30,
      //  @ts-ignore
      revalidateOnFocus: false,
      revalidateIfStale: false,
    })
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
