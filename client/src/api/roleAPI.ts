import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const getRoleAPI = async () => {
  return useAxios
    .get(`/admin/role`)
    .then((res) => res.data)
    .catch(catchError);
};

export const getAllRoleAPI = async () => {
  return useAxios
    .get(`/admin/roles`)
    .then((res) => res.data)
    .catch(catchError);
};
