import { useCallback, useEffect, useState } from "react";

import { Context } from "../../types";
import useSWR from "swr";
import { getAllCitiesOptionsAPI } from "../../api/addressAPI";

// @ts-ignore
export const useAddressCitiesPermanent: Context = (
  // @ts-ignore
  url,
  // @ts-ignore
  setData
) => {
  const [searchProvincePermanent, setSearchProvincePermanent] =
    useState(setData);

  const config = {
    timeout: 1000 * 30,
  };

  const debounceOnChange = (func: () => void) => {
    return function (...args: any) {
      // @ts-ignore
      const context = this;
      // @ts-ignore
      func.apply(context, args);
    };
  };

  const handleChange = async (
    // @ts-ignore
    val
  ) => {
    setSearchProvincePermanent(val?.id);

    const paramsObj = {
      provinceId: searchProvincePermanent,
    };

    // @ts-ignore
    const searchParams = new URLSearchParams(paramsObj);

    getAllCitiesOptionsAPI({
      params: searchParams,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    }).then((res) => res.data);
  };

  // @ts-ignore
  const onSearchProvincePermanent = useCallback(
    // @ts-ignore
    debounceOnChange(handleChange),
    []
  );

  const fetcher = async () => {
    // @ts-ignore
    const searchParams = searchProvincePermanent || null;
    const paramsObj = {
      provinceId: searchParams,
    };

    try {
      const response = await getAllCitiesOptionsAPI({
        params: paramsObj,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        ...config,
      });

      return response.data ?? [];
    } catch (error) {
      console.error(error);
    }
  };

  // @ts-ignore
  const { data, mutate } = useSWR(`${url}/search`, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    mutate();
  }, [searchProvincePermanent, mutate]);

  return {
    data,
    onSearchProvincePermanent,
    searchProvincePermanent,
  };
};
