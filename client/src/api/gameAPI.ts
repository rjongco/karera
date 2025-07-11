import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

// export const openGameMatchAPI = async (data: any) => {
//   return useAxios
//     .post(`/admin/game/match/open`, data)
//     .then((res) => res.data)
//     .catch((error) => {
//       // eslint-disable-next-line no-throw-literal
//       throw {
//         status: error.response.data.status,
//         type: error.response.data.type,
//         message: error.response.data.message,
//       };
//     });
// };

// export const getGameMatchAPI = async (data) => {
//   return await useAxios
//     .get(`/admin/game/match`)
//     .then((res) => res.data)
//     .catch((error) => {
//       // eslint-disable-next-line no-throw-literal
//       throw {
//         status: error.response.data.status,
//         type: error.response.data.type,
//         message: error.response.data.message,
//       };
//     });
// };
