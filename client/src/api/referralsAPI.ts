import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const getReferralsAPI = async (data: any) => {
  return await useAxios
    .get(`/admin/referrals`, data)
    .then((res) => res.data)
    .catch(catchError);
};
