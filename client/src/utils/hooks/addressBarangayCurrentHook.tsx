import { useCallback, useEffect, useState } from "react";

import { Context } from "../../types";
import useSWR from "swr";
import { getAllBarangaysOptionsAPI } from "../../api/addressAPI";

// @ts-ignore
export const useAddressBarangayCurrent: Context = (
  // @ts-ignore
  url,
  // @ts-ignore
  setDataProvinceCurrent,
  // @ts-ignore
  setDataCitiesCurrent
) => {
  const [searchCitiesCurrent, setSearchCitiesCurrent] =
    useState(setDataCitiesCurrent);
  const [searchProvinceCurrent, setSearchProvinceCurrent] = useState(
    setDataProvinceCurrent
  );

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
    city,
    // @ts-ignore
    provinceId
  ) => {
    setSearchCitiesCurrent(city?.id);
    setSearchProvinceCurrent(provinceId?.id);

    const paramsObj = {
      provinceId,
      cityId: city?.id,
    };

    // @ts-ignore
    const searchParams = new URLSearchParams(paramsObj);

    getAllBarangaysOptionsAPI({
      params: searchParams,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    }).then((res) => res.data);
  };

  // @ts-ignore
  const onSearchCitiesCurrent = useCallback(
    // @ts-ignore
    debounceOnChange(handleChange),
    []
  );

  const fetcher = async () => {
    // @ts-ignore
    const searchParamsCitiesCurrent = searchCitiesCurrent || null;
    const searchParamsProvinceCurrent = searchProvinceCurrent || null;

    const paramsObj = {
      provinceId: searchParamsProvinceCurrent,
      cityId: searchParamsCitiesCurrent,
    };

    try {
      const response = await getAllBarangaysOptionsAPI({
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
  }, [searchCitiesCurrent, mutate]);

  return {
    data,
    onSearchCitiesCurrent,
    searchCitiesCurrent,
  };
};
