import {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
  useReducer,
} from "react";

import { useLogs } from "../utils/hooks/logsHook";
import {
  logsReducer,
  logsInitialState,
  logsActions,
} from "../reducer/LogsReducer";

export interface ILogs {
  logsState: any;
  dispatchLogs: React.Dispatch<any>;
  logstInitialState: {
    loading: boolean;
    error: boolean;
    errorType: string;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    logs: any[];
  };
  actions: {};
}

// @ts-ignore
const LogsContext = createContext<ILogs>();

export const useLogsContext = () => {
  return useContext(LogsContext);
};

// @ts-ignore
const LogsProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();
  const [sorted, setSorted] = useState("");
  const [searchData, setSearchData] = useState(null);

  const [logsState, dispatchLogs] = useReducer(logsReducer, {
    ...logsInitialState,
  });

  // @ts-ignore
  const {
    data: logsData,
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
    mutate: mutateLogs,
    // @ts-ignore
  } = useLogs("/admin/logs", setSearchData);

  useEffect(() => {
    mutateLogs();
  }, [searchVal, mutateLogs, size, page, logsData, optimizedSubmitFn]);

  useEffect(() => {
    Object.keys(logsActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          logsActions[key](...args)(dispatchLogs, stateRef.current);
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = logsState;
  }, [logsState]);

  const value = useMemo(
    () => ({
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      logsData,
      mutateLogs,
      actions,
      error,
      logsState,
      dispatchLogs,
    }),
    [
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      logsData,
      mutateLogs,
      actions,
      error,
      logsState,
      dispatchLogs,
    ]
  );

  return (
    // @ts-ignore
    <LogsContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </LogsContext.Provider>
  );
};
export default LogsProvider;
