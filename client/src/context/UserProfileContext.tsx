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
  userProfileReducer,
  userProfileInitialState,
  userProfileActions,
} from "../reducer/UserProfileReducer";
import { GlobalContext } from "./GlobalProvider";
import {
  getAllBarangaysOptionsAPI,
  getAllProvincesOptionsAPI,
} from "../api/addressAPI";
import useSWR from "swr";
import { useAddressCitiesPermanent } from "../utils/hooks/addressCitiesPermanentHook";
import { useAddressCitiesCurrent } from "../utils/hooks/addressCitiesCurrentHook";
import { useAddressBarangayPermanent } from "../utils/hooks/addressBarangayPermanentHook";
import { useAddressBarangayCurrent } from "../utils/hooks/addressBarangayCurrentHook";

export interface IUserProfile {
  userProfileState: any;
  dispatchUserProfileState: React.Dispatch<any>;
  userProfileInitialState: {
    loading: boolean;
    error: boolean;
    errorType: string;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    data: any[];
    isUploadedProfilePic: boolean;
    isDeletingProfilePic: boolean;
    deletingProfilePic: boolean;
    uploadingProfilePic: boolean;
    uploadProPicProgress: number;
  };
  actions: {
      uploadProfilePic: (id: number, formData:any, type:string) => void;
      updateUserProfile: (param: any) => void;
      removeProfilePicture: () => void;
      generateCode: (param: any) => void;
  };
}

// @ts-ignore
const UserProfileContext = createContext<IUserProfile>();

export const useUserProfileContext = () => {
  return useContext(UserProfileContext);
};

// @ts-ignore
const UserProfileProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();

  // @ts-ignore
  const {
    // @ts-ignore
    setAuthInfo,
    // @ts-ignore
    auth: authInfo,
  } = useContext(GlobalContext);

  const [userProfileState, dispatchUserProfile] = useReducer(
    userProfileReducer,
    {
      ...userProfileInitialState,
    }
  );

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
  // @ts-ignore
  const [searchStateProvincePermanent, setSearchProvincePermanent] =
    useState(null);

  // @ts-ignore
  const {
    data: citiesOptionsPermanent,
    // @ts-ignore
    searchProvincePermanent,
    // @ts-ignore
    onSearchProvincePermanent,
    // @ts-ignore
  } = useAddressCitiesPermanent(
    "/address/cities/permanent/options",
    setSearchProvincePermanent
  );

  // @ts-ignore
  const [searchStateProvinceCurrent, setSearchProvinceCurrent] = useState(null);
  // @ts-ignore
  const {
    data: citiesOptionsCurrent,
    // @ts-ignore
    searchProvinceCurrent,
    // @ts-ignore
    onSearchProvinceCurrent,
    // @ts-ignore
  } = useAddressCitiesCurrent(
    "/address/cities/current/options",
    setSearchProvinceCurrent
  );

  // @ts-ignore
  const [searchStateCitiesPermanent, setDataCitiesPermanent] = useState(null);

  const {
    data: barangaysOptionsPermanent,
    // @ts-ignore
    searchBarangayPermanent,
    // @ts-ignore
    onSearchCitiesPermanent,
    // @ts-ignore
  } = useAddressBarangayPermanent(
    "/address/barangays/permanent/options",
    setDataCitiesPermanent,
    setSearchProvincePermanent
  );

  // @ts-ignore
  const [searchStateCitiesCurrent, setDataCitiesCurrent] = useState(null);

  const {
    data: barangaysOptionsCurrent,
    // @ts-ignore
    searchBarangayCurrent,
    // @ts-ignore
    onSearchCitiesCurrent,
    // @ts-ignore
  } = useAddressBarangayCurrent(
    "/address/barangays/current/options",
    setDataCitiesCurrent,
    setSearchProvinceCurrent
  );

  useEffect(() => {
    if (userProfileState.success) {
      setAuthInfo({ ...authInfo, ...userProfileState.data });
    }
  }, [userProfileState.success, userProfileState.data]);

  useEffect(() => {
    Object.keys(userProfileActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          userProfileActions[key](...args)(
            dispatchUserProfile,
            stateRef.current
          );
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = userProfileState;
  }, [userProfileState]);

  const value = useMemo(
    () => ({
      userProfileState,

      provinceOptions,
      citiesOptionsPermanent,
      citiesOptionsCurrent,
      barangaysOptionsPermanent,
      barangaysOptionsCurrent,

      onSearchProvincePermanent,
      onSearchProvinceCurrent,
      onSearchCitiesPermanent,
      onSearchCitiesCurrent,

      actions,
      dispatchUserProfile,
    }),
    [
      userProfileState,

      provinceOptions,

      citiesOptionsPermanent,
      citiesOptionsCurrent,
      barangaysOptionsPermanent,
      barangaysOptionsCurrent,

      onSearchProvincePermanent,
      onSearchProvinceCurrent,
      onSearchCitiesPermanent,
      onSearchCitiesCurrent,

      actions,
      dispatchUserProfile,
    ]
  );

  return (
    // @ts-ignore
    <UserProfileContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </UserProfileContext.Provider>
  );
};
export default UserProfileProvider;
