import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const getUsers = async (data: any) => {
  return await useAxios
    .get(`/admin/users`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const addUserAPI = async (data: any) => {
  return useAxios
    .post(`/admin/users/register`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const updateUserAPI = async (data: any) => {
  const { id, ...rest } = data;
  return useAxios
    .put(`/admin/users/update/${id}`, rest)
    .then((res) => res.data)
    .catch(catchError);
};

export const deleteUserAPI = async (userId: any) => {
  return useAxios
    .delete(`/admin/users/delete/${userId}`)
    .then((res) => res.data)
    .catch(catchError);
};

export const restoreUserAPI = async (userId: any) => {
  return useAxios
    .delete(`/admin/users/restore/${userId}`)
    .then((res) => res.data)
    .catch(catchError);
};

export const approveOrDeactiveVerifierAPI = async (data: any) => {
  const { id, type, reason } = data;
  return useAxios
    .put(`/admin/users/verifier/actions/${id}`, { type, reason })
    .then((res) => res.data)
    .catch(catchError);
};

export const addCreditAPI = async (data: any) => {
  return useAxios
    .post(`/admin/users/credit`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const checkUserAPI = async (id: any) => {
  return useAxios
    .get(`/admin/users/check/${id}`)
    .then((res) => res.data)
    .catch(catchError);
};

export const getAllUsersForOptionsAPI = async () => {
  return useAxios
    .get(`/admin/users/for-options`)
    .then((res) => res.data)
    .catch(catchError);
};
