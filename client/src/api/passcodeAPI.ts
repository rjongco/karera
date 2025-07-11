import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const createPasscodeAPI = async (data:any) => {
    return await useAxios
      .post(`/admin/user/create/passcode`, data)
      .then((res) => res.data)
      .catch(catchError);
  };