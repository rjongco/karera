import { useCallback, useState } from "react";
import { getUsers } from "../../api/userManagementAPI";
import { Context } from "../../types";
import useSWR from "swr";

// @ts-ignore
export const useUserProfile: Context = (
  // @ts-ignore
  url,
  // @ts-ignore
  sorted,
  // @ts-ignore
  searchRoles,
  // @ts-ignore
  searchStatus,
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
    const paramsObj = {
      filter: `keywords,${searchVal ?? ""}`,
      page,
      size,
      roles: searchRoles,
      status: searchStatus,
      sort: ["updatedAt", "desc"],
    };

    // @ts-ignore
    const searchParams = new URLSearchParams(paramsObj);

    try {
      const response = await getUsers({
        params: searchParams,
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

  const handleChange = (
    // @ts-ignore
    value
  ) => {
    const paramsObj = {
      filter: `keywords,${value ?? ""}`,
      page,
      size,
      roles: searchRoles,
      status: searchStatus,
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
  // @ts-ignore
  const optimizedFn = useCallback(debounce(handleChange), []);

  // @ts-ignore
  const { data, mutate, error } = useSWR(`${url}/admin/user/search`, fetcher);

  return {
    data,
    page,
    size,
    setPage,
    setSize,
    optimizedFn,
    searchVal,
    error,
    mutate,
  };
};
