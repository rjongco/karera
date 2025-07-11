import {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
  useReducer,
} from "react";

import {
  verifyMobileReducer,
  verifyMobileInitialState,
  verifyMobileActions,
} from "../reducer/VerifyMobileReducer";

export interface IVerifyMobileContext {
  verifyMobileState: any;
  dispatchVerifyMobile: React.Dispatch<any>;
  verifyMobiletInitialState: {
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
const VerifyMobileContext = createContext<IVerifyMobileContext>();

export const useVerifyMobileContext = () => {
  return useContext(VerifyMobileContext);
};

// @ts-ignore
const VerifyMobileProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();

  const [verifyMobileState, dispatchVerifyMobile] = useReducer(
    verifyMobileReducer,
    {
      ...verifyMobileInitialState,
    }
  );

  useEffect(() => {
    Object.keys(verifyMobileActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          verifyMobileActions[key](...args)(
            dispatchVerifyMobile,
            stateRef.current
          );
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = verifyMobileState;
  }, [verifyMobileState]);

  const value = useMemo(
    () => ({
      actions,
      verifyMobileState,
      dispatchVerifyMobile,
    }),
    [actions, verifyMobileState, dispatchVerifyMobile]
  );

  return (
    // @ts-ignore
    <VerifyMobileContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </VerifyMobileContext.Provider>
  );
};
export default VerifyMobileProvider;
