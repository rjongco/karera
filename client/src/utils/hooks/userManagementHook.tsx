import { useEffect, useCallback, useState } from "react";
import useAxios from "../axios";
import { getUsers } from "../../api/userManagementAPI";
import { Context } from "../../types";
import useSWR from "swr";

// @ts-ignore
export const useUserManagement: Context = (
  // @ts-ignore
  url,
  // @ts-ignore
  setData
) => {
  const [searchVal, setSearchVal] = useState(setData);
  // @ts-ignore
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // @ts-ignore

  const config = {
    timeout: 1000 * 30,
  };

  const fetcher = async () => {

    const searchParams = searchVal !== undefined ? searchVal : "";

    const nonEmptyFields = Object.entries(searchParams)
      .filter(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return value
        }else{
          return String(value).trim() !== '';
        }
      })
      .map(([key, value]) => `${key}=${encodeURIComponent(String(JSON.stringify(value)))}`)
      .join("&");

    const paramsObj = {
      filter: nonEmptyFields,
      page,
      size,
      sort: ["updatedAt", "desc"],
    };

    // @ts-ignore
    const searchParamsFetch = new URLSearchParams(paramsObj);

    try {
      const response = await getUsers({
        params: searchParamsFetch,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        ...config,
      });

      return response.data ?? [];
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const debounce = (func: () => void) => {
    let timer: () => string | number;
    return function (...args: any) {
      // @ts-ignore
      const context = this;
      // @ts-ignore
      if (timer) clearTimeout(timer);
      // @ts-ignore
      timer = setTimeout(() => {
        // @ts-ignore
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const debounceOnSubmit = (func: () => void) => {
    return function (...args: any) {
      // @ts-ignore
      const context = this;
      // @ts-ignore
      func.apply(context, args);
    };
  };

  const handleChange = (
    // @ts-ignore
    value
  ) => {
    const paramsObj = {
      filter: `keywords,${value ?? ""}`,
      page,
      size,
      sort: ["createdAt", "desc"],
    };
    setSearchVal(value);
    // @ts-ignore
    const searchParams = new URLSearchParams(paramsObj);

    getUsers({
      params: searchParams,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    }).then((res) => res.data);
  };

  const handleSubmit = async (obj: any) => {
    // @ts-ignore
    const nonEmptyFields = Object.entries(obj)
      .filter(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return value
        }else{
          return String(value).trim() !== '';
        }
      })
      .map(([key, value]) => `${key}=${encodeURIComponent(String(JSON.stringify(value)))}`)
      .join("&");

    setSearchVal(obj);

    const paramsObj = {
      filter: nonEmptyFields,
      page,
      size,
      sort: ["updatedAt", "desc"],
    };

    // @ts-ignore
    const searchParamsOnSubmit = new URLSearchParams(paramsObj);

    getUsers({
      params: searchParamsOnSubmit,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    }).then((res) => res.data);
  };

  // @ts-ignore
  const optimizedFn = useCallback(debounce(handleChange), []);

  // @ts-ignore
  const optimizedSubmitFn = useCallback(debounceOnSubmit(handleSubmit), []);

  // @ts-ignore
  const { data, mutate, error } = useSWR(`${url}/admin/user/search`, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // refreshInterval: 1000,
  });

  return {
    data,
    page,
    size,
    setPage,
    setSize,
    optimizedFn,
    optimizedSubmitFn,
    searchVal,
    error,
    mutate,
  };
};
