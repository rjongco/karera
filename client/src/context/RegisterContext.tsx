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
  registerReducer,
  registerInitialState,
  registerActions,
} from "../reducer/RegisterReducer";

export interface IRegisterContext {
  registerState: any;
  dispatchRegister: React.Dispatch<any>;
  registertInitialState: {
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
const RegisterContext = createContext<IRegisterContext>();

export const useRegisterContext = () => {
  return useContext(RegisterContext);
};

// @ts-ignore
const RegisterProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();

  const [registerState, dispatchRegister] = useReducer(registerReducer, {
    ...registerInitialState,
  });

  useEffect(() => {
    Object.keys(registerActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          registerActions[key](...args)(dispatchRegister, stateRef.current);
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = registerState;
  }, [registerState]);

  const value = useMemo(
    () => ({
      actions,
      registerState,
      dispatchRegister,
    }),
    [actions, registerState, dispatchRegister]
  );

  return (
    // @ts-ignore
    <RegisterContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </RegisterContext.Provider>
  );
};
export default RegisterProvider;
