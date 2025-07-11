import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const getGamesAPI = async () => {
  return useAxios
    .get(`/games`)
    .then((res) => res.data)
    .catch(catchError);
};
