import { useCallback, useEffect, useState } from "react";

import { getGamesTransactionsAPI } from "../../api/gamesTransactionsAPI";
import { Context } from "../../types";
import useSWR from "swr";

// @ts-ignore
export const useGamesTransactions: Context = (
  // @ts-ignore
  url,
  // @ts-ignore
  setData
) => {
  const [searchVal, setSearchVal] = useState(setData);
  // @ts-ignore
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(15);

  // @ts-ignore

  const config = {
    timeout: 1000 * 30,
  };

  const fetcher = async () => {
    // @ts-ignore
    const searchParams = searchVal !== undefined ? searchVal : "";

    // @ts-ignore
    const nonEmptyFields = Object.entries(searchParams)
      // @ts-ignore
      .filter(([key, value]) => value !== "")
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const paramsObj = {
      filter: nonEmptyFields,
      page,
      size,
      sort: ["updatedAt", "desc"],
    };

    // @ts-ignore
    const searchParamsFinal = new URLSearchParams(paramsObj);

    try {
      const response = await getGamesTransactionsAPI({
        params: searchParamsFinal,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        ...config,
      });
      return response.data || [];
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

  const handleSubmit = async (obj: any) => {
    // @ts-ignore
    const nonEmptyFields = Object.entries(obj)
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    setSearchVal(obj);

    const paramsObj = {
      filter: nonEmptyFields,
      page,
      size,
      sort: ["createdAt", "desc"],
    };

    // @ts-ignore
    const searchParams = new URLSearchParams(paramsObj);

    getGamesTransactionsAPI({
      params: searchParams,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    }).then((res: any) => res.data);
  };

  const handleChange = async (
    // @ts-ignore
    obj
  ) => {
    // @ts-ignore
    const nonEmptyFields = Object.entries(obj)
      // @ts-ignore
      .filter(([key, value]) => value.trim() !== "")
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    setSearchVal(obj);

    const paramsObj = {
      filter: nonEmptyFields,
      page,
      size,
      sort: ["updatedAt", "desc"],
    };

    // @ts-ignore
    const searchParams = new URLSearchParams(paramsObj);

    getGamesTransactionsAPI({
      params: searchParams,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    }).then((res: any) => res.data);
  };

  // @ts-ignore
  const optimizedFn = useCallback(debounce(handleChange), []);

  // @ts-ignore
  const optimizedSubmitFn = useCallback(debounceOnSubmit(handleSubmit), []);

  // @ts-ignore
  const { data, mutate, error } = useSWR(`${url}/search`, fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    mutate();
  }, [searchVal, mutate]);

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
