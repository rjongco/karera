import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  userManagementReducer,
  userManagementInitialState,
  userManagementActions,
} from "../reducer/UserManagementReducer";
import { useUserManagement } from "../utils/hooks/userManagementHook";
import { getAllUsersForOptionsAPI } from "../api/userManagementAPI";
import useSWR from "swr";
import { getAllBarangaysOptionsAPI, getAllCitiesOptionsAPI, getAllProvincesOptionsAPI } from "../api/addressAPI";

export interface IUserManagement {
  page: number;
  size: number;
  setPage: number;
  setSize: any;
  optimizedFn: any;
  optimizedSubmitFn: any;
  usersData: any;
  mutateUserManagement:any;
  provinceOptions: any;
  setProvinceId:any;
  cityOptions: any;
  setCityId: any;
  barangayOptions:any;
  userManagementState: any;
  dispatchUserManagement: React.Dispatch<any>;
  userManagementInitialState: {
    loading: boolean;
    error: boolean;
    errorType: string;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    pageUsers: any[];
  };
  actions: {
    addUser: (param:any) => void;
    updateUser: (param:any) => void;
    deleteUser: (param:any) => void;
    restoreUser: (param:any) => void;
    approveOrDeactiveVerifier: (param:any) => void;
    addCredit: (param:any) => void;
  };
}

// @ts-ignore
const UserManagementContext = createContext<IUserManagement>();

export const useUserManagementContext = () => {
  return useContext(UserManagementContext);
};

const config = {
  timeout: 1000 * 30,
};

// @ts-ignore
const UserManagementProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();
  const [sorted, setSorted] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(null);
  
  const getProfile = async () => {
    const response = await getAllUsersForOptionsAPI();
    return response?.data;
  };

  const { data: userGroups } = useSWR("/admin/users/for-options", getProfile, {
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });


  const getProvinces = async () => {
    const response = await getAllProvincesOptionsAPI();
    return response?.data;
  };

  const { data: provinceOptions } = useSWR(
    "/address/provinces/options",
    getProvinces,
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  
  const getCities = async () => {
    const searchParams = {
      provinceId
    }
    const response = await getAllCitiesOptionsAPI({
      params: searchParams,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    });
    return response?.data;
  };

  const { data: cityOptions, mutate:mutateCity } = useSWR(
    "/address/cities/options",
    getCities,
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );


  const getBarangay = async () => {
    const searchParams = {
      provinceId,
      cityId
    }
    const response = await getAllBarangaysOptionsAPI({
      params: searchParams,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      ...config,
    });
    return response?.data;
  };

  const { data: barangayOptions, mutate:mutateBarangay } = useSWR(
    "/address/barangay/options",
    getBarangay,
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(()=> {
    if(provinceId){
      mutateCity()
    }
  },[provinceId])

  useEffect(()=> {
    if(cityId){
      mutateBarangay()
    }
  },[cityId])

  const [userManagementState, dispatchUserManagement] = useReducer(
    userManagementReducer,
    {
      ...userManagementInitialState,
    }
  );

  // @ts-ignore
  const {
    data: usersData,
    // @ts-ignore
    page,
    // @ts-ignore
    size,
    // @ts-ignore
    setPage,
    // @ts-ignore
    setSize,
    // @ts-ignore
    optimizedFn,
    // @ts-ignore
    optimizedSubmitFn,
    searchVal,
    error,
    mutate: mutateUserManagement,
    // @ts-ignore
  } = useUserManagement("/admin/users", setSearchData);

  useEffect(() => {
    mutateUserManagement();
  }, [searchData, searchVal, mutateUserManagement, size, page, usersData]);

  useEffect(() => {
    Object.keys(userManagementActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          userManagementActions[key](...args)(
            dispatchUserManagement,
            stateRef.current
          );
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = userManagementState;
  }, [userManagementState]);

  const value = useMemo(
    () => ({
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      usersData,
      provinceOptions,
      setProvinceId,
      cityOptions,
      setCityId,
      barangayOptions,
      userGroups,
      mutateUserManagement,
      actions,
      error,
      userManagementState,
      dispatchUserManagement,
    }),
    [
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      usersData,
      provinceOptions,
      setProvinceId,
      cityOptions,
      setCityId,
      barangayOptions,
      userGroups,
      mutateUserManagement,
      actions,
      error,
      userManagementState,
      dispatchUserManagement,
    ]
  );

  return (
    // @ts-ignore
    <UserManagementContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </UserManagementContext.Provider>
  );
};
export default UserManagementProvider;
