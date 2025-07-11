import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const getNotification = async (data: any) => {
  return await useAxios
    .get(`/admin/notifications`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const readNotifAPI = async (data: any) => {
  const { id, ...rest } = data;
  return useAxios
    .put(`/admin/notifications/read/${id}`, rest)
    .then((res) => res.data)
    .catch(catchError);
};

export const getNotificationCustomAPI = async () => {
  return await useAxios
    .get(`/admin/notifications/custom`)
    .then((res) => res.data)
    .catch(catchError);
};
