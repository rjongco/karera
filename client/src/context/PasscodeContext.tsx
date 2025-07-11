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
    passcodeReducer,
    passcodeInitialState,
    passcodeActions,
  } from "../reducer/PasscodeReducer";
  
  export interface IPasscode {
    passcodeState: any;
    paymentCards: any;
    mutatePaymentCards: any;
    dispatchPasscode: React.Dispatch<any>;
    passcodeInitialState: {
      loading: boolean;
      error: boolean;
      errorType: string;
      errorMessage: string;
      success: boolean;
      successMessage: string;
      data: any[];
    };
    actions: {
        createPasscode: (param:any) => void;
    };
  }
  
  // @ts-ignore
  const PasscodeContext = createContext<IPasscode>();
  
  export const usePasscodeContext = () => {
    return useContext(PasscodeContext);
  };
  
  // @ts-ignore
  const PasscodeProvider = ({ children }) => {
    const [actions, setActions] = useState({});
    const stateRef = useRef();
  
    const [passcodeState, dispatchPasscode] = useReducer(passcodeReducer, {
      ...passcodeInitialState,
    });

  
    useEffect(() => {
      Object.keys(passcodeActions).forEach((key) => {
        setActions((curr) => ({
          ...curr,
          // @ts-ignore
          [key]: (...args) => {
            // @ts-ignore
            passcodeActions[key](...args)(dispatchPasscode, stateRef.current);
          },
        }));
      });
    }, []);
  
    useEffect(() => {
      stateRef.current = passcodeState;
    }, [passcodeState]);
  
    const value = useMemo(
      () => ({
        actions,
        passcodeState,
        dispatchPasscode,
      }),
      [actions, passcodeState, dispatchPasscode]
    );
  
    return (
      // @ts-ignore
      <PasscodeContext.Provider value={value}>
        {children}
        {/* @ts-ignore*/}
      </PasscodeContext.Provider>
    );
  };
  export default PasscodeProvider;
  