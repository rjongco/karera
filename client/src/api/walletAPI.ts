import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const addGameDepositAPI = async (data: any) => {
  return useAxios
    .post(`/admin/game/deposit`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const addGameWithdrawAPI = async (data: any) => {
  return useAxios
    .post(`/admin/game/withdraw`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const getPaymentCardsAPI = async () => {
  return useAxios
    .get(`/admin/user/payment/cards`)
    .then((res) => res.data)
    .catch(catchError);
};

export const addPaymentCardAPI = async (data: any) => {
  return useAxios
    .post(`/admin/user/payment/card`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const authPinCodeAPI = async (data: any) => {
  return useAxios
    .post(`/admin/user/payment/pincode`, data)
    .then((res) => res.data)
    .catch(catchError);
};

