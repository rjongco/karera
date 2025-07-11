import useAxios from "../utils/axios";
import { catchError } from "../utils/logic";

export const getAllProvincesOptionsAPI = async () => {
  return useAxios
    .get(`/admin/address/provinces/options`)
    .then((res) => res.data)
    .catch(catchError);
};

export const getAllCitiesOptionsAPITest = async () => {
  const paramsObj = {
    provinceId: 49,
  };
  // @ts-ignore
  const searchParamsFinal = new URLSearchParams(paramsObj);

  return useAxios
    .get(`/admin/address/cities/options`, {
      params: searchParamsFinal,
      // @ts-ignore
      revalidateOnFocus: false,
      revalidateIfStale: false,
    })
    .then((res) => res.data)
    .catch(catchError);
};

export const getAllCitiesOptionsAPI = async (data: any) => {
  return await useAxios
    .get(`/admin/address/cities/options`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const getAllBarangaysOptionsAPI = async (data: any) => {
  return await useAxios
    .get(`/admin/address/barangays/options`, data)
    .then((res) => res.data)
    .catch(catchError);
};

export const getAllBarangaysOptionsAPITest = async () => {
  const paramsObj = {
    provinceId: 49,
    cityId: 970,
  };
  // @ts-ignore
  const searchParamsFinal = new URLSearchParams(paramsObj);

  return useAxios
    .get(`/admin/address/barangays/options`, {
      params: searchParamsFinal,
      // @ts-ignore
      revalidateOnFocus: false,
      revalidateIfStale: false,
    })
    .then((res) => res.data)
    .catch(catchError);
};
