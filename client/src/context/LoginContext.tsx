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
  loginReducer,
  loginInitialState,
  loginActions,
} from "../reducer/LoginReducer";

export interface ILoginContext {
  loginState: any;
  dispatchLogin: React.Dispatch<any>;
  logintInitialState: {
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
const LoginContext = createContext<ILoginContext>();

export const useLoginContext = () => {
  return useContext(LoginContext);
};

// @ts-ignore
const LoginProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();

  const [loginState, dispatchLogin] = useReducer(loginReducer, {
    ...loginInitialState,
  });

  useEffect(() => {
    Object.keys(loginActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          loginActions[key](...args)(dispatchLogin, stateRef.current);
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = loginState;
  }, [loginState]);

  const value = useMemo(
    () => ({
      actions,
      loginState,
      dispatchLogin,
    }),
    [actions, loginState, dispatchLogin]
  );

  return (
    // @ts-ignore
    <LoginContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </LoginContext.Provider>
  );
};
export default LoginProvider;
