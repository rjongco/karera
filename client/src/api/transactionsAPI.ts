import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const getCreditsAPI = async () => {
  return useAxios
    .get(`/admin/user/balance`)
    .then((res) => res.data)
    .catch(catchError);
};

export const getTransactionsAPI = async (data: any) => {
  return await useAxios
    .get(`/admin/transactions`, data)
    .then((res) => res.data)
    .catch(catchError);
};
