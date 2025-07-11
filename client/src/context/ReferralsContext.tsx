import {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
  useReducer,
} from "react";

import { useReferrals } from "../utils/hooks/referralsHook";
import {
  referralsReducer,
  referralsInitialState,
  referralsActions,
} from "../reducer/ReferalsReducer";

export interface IReferrals {
  referralsState: any;
  dispatchReferrals: React.Dispatch<any>;
  referralstInitialState: {
    loading: boolean;
    error: boolean;
    errorType: string;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    data: any[];
  };
  actions: {};
}

// @ts-ignore
const ReferralsContext = createContext<IReferrals>();

export const useReferralsContext = () => {
  return useContext(ReferralsContext);
};

// @ts-ignore
const ReferralsProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();
  const [sorted, setSorted] = useState("");
  const [searchData, setSearchData] = useState(null);

  const [referralsState, dispatchReferrals] = useReducer(referralsReducer, {
    ...referralsInitialState,
  });

  // @ts-ignore
  const {
    data: referralsData,
    // @ts-ignore
    page,
    // @ts-ignore
    size,
    // @ts-ignore
    setPage,
    // @ts-ignore
    setSize,
    optimizedFn,
    optimizedSubmitFn,
    searchVal,
    error,
    mutate: mutateReferrals,
    // @ts-ignore
  } = useReferrals("/admin/referrals", setSearchData);

  useEffect(() => {
    mutateReferrals();
  }, [
    searchVal,
    mutateReferrals,
    size,
    page,
    referralsData,
    optimizedSubmitFn,
  ]);

  useEffect(() => {
    Object.keys(referralsActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          referralsActions[key](...args)(dispatchReferrals, stateRef.current);
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = referralsState;
  }, [referralsState]);

  const value = useMemo(
    () => ({
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      referralsData,
      mutateReferrals,
      actions,
      error,
      referralsState,
      dispatchReferrals,
    }),
    [
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      referralsData,
      mutateReferrals,
      actions,
      error,
      referralsState,
      dispatchReferrals,
    ]
  );

  return (
    // @ts-ignore
    <ReferralsContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </ReferralsContext.Provider>
  );
};
export default ReferralsProvider;
