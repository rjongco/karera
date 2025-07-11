import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const getGamesTransactionsAPI = async (data: any) => {
  return useAxios
    .get(`/admin/game/transactions`, data)
    .then((res) => res.data)
    .catch(catchError);
};
