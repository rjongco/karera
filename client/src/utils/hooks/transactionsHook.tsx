import { useCallback, useEffect, useState } from "react";

import { getTransactionsAPI } from "../../api/transactionsAPI";
import { Context } from "../../types";
import useSWR from "swr";

// @ts-ignore
export const useTransactions = (
  // @ts-ignore
  url: any,
  setData: any,
  setSorted: any
) => {
  const [searchVal, setSearchVal] = useState(setData);
  const [sortVal, setSortVal] = useState(setSorted);

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
      // @ts-ignore
      .filter(([key, value]) => value.trim() !== "")
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const sortParams = sortVal !== undefined ? sortVal : "";

    const paramsObj = {
      filter: nonEmptyFields,
      page,
      size,
      sort: sortParams,
    };

    // @ts-ignore
    const searchParamsFinal = new URLSearchParams(paramsObj);

    try {
      const response = await getTransactionsAPI({
        params: searchParamsFinal,
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

  const debounceOnSort = (func: () => void) => {
    return function (...args: any) {
      // @ts-ignore
      const context = this;
      // @ts-ignore
      func.apply(context, args);
    };
  };

  const handleSort = async (obj: any) => {
    const nonEmptyFields = Object.entries(
      searchVal !== undefined ? searchVal : ""
    )
      // @ts-ignore
      .filter(([key, value]) => value.trim() !== "")
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    const sortFields = Object.entries(obj)
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    setSortVal(sortFields);

    const paramsObj = {
      filter: nonEmptyFields,
      page,
      size,
      sort: sortFields,
    };

    // @ts-ignore
    const searchParams = new URLSearchParams(paramsObj);

    getTransactionsAPI({
      params: searchParams,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    }).then((res: any) => res.data);
  };

  const handleSubmit = async (obj: any) => {
    // @ts-ignore
    const nonEmptyFields = Object.entries(obj)
      // @ts-ignore
      .filter(([key, value]) => value.trim() !== "")
      // @ts-ignore
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    setSearchVal(obj);

    const sortParams = sortVal !== undefined ? sortVal : "";
    // const sortFields = Object.entries(sortParams)
    //   // @ts-ignore
    //   .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    //   .join("&");

    const paramsObj = {
      filter: nonEmptyFields,
      page,
      size,
      sort: sortParams,
    };

    // @ts-ignore
    const searchParams = new URLSearchParams(paramsObj);

    getTransactionsAPI({
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

    getTransactionsAPI({
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
  const optimizedSortFn = useCallback(debounceOnSort(handleSort), []);

  // @ts-ignore
  const { data, mutate, error } = useSWR(`${url}/search`, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    mutate();
  }, [searchVal, sortVal, mutate]);

  return {
    data,
    page,
    size,
    setPage,
    setSize,
    optimizedFn,
    optimizedSubmitFn,
    optimizedSortFn,
    searchVal,
    sortVal,
    error,
    mutate,
  };
};
