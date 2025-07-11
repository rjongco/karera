import {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
  useReducer,
} from "react";

import { useTransactions } from "../utils/hooks/transactionsHook";
import {
  transactionsReducer,
  transactionsInitialState,
  transactionsActions,
  // @ts-ignore
} from "../reducer/TransactionsReducer";

export interface ITransactions {
  page: any;
  size: any;
  setPage: any;
  setSize: any;
  transactionsData: any;
  transactionsState: any;
  optimizedSubmitFn: (param: any) => void;
  optimizedSortFn: (param: any) => void;
  dispatchTransactions: React.Dispatch<any>;
  transactionstInitialState: {
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
const TransactionsContext = createContext<ITransactions>();

export const useTransactionsContext = () => {
  return useContext(TransactionsContext);
};

// @ts-ignore
const TransactionsProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();
  const [sorted, setSorted] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const [transactionState, dispatchTransactions] = useReducer(
    transactionsReducer,
    {
      ...transactionsInitialState,
    }
  );

  // @ts-ignore
  const {
    data: transactionsData,
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
    optimizedSortFn,
    searchVal,
    sortVal,
    error,
    mutate: mutateTransactions,
    // @ts-ignore
  } = useTransactions("/admin/transactions", setSearchData, setSorted);

  useEffect(() => {
    mutateTransactions();
  }, [
    searchVal,
    sortVal,
    mutateTransactions,
    size,
    page,
    transactionsData,
    optimizedSubmitFn,
    optimizedSortFn,
  ]);

  useEffect(() => {
    Object.keys(transactionsActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          transactionsActions[key](...args)(
            dispatchTransactions,
            stateRef.current
          );
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = transactionState;
  }, [transactionState]);

  const value = useMemo(
    () => ({
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      optimizedSortFn,
      transactionsData,
      mutateTransactions,
      actions,
      error,
      transactionState,
      dispatchTransactions,
    }),
    [
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      optimizedSortFn,
      transactionsData,
      mutateTransactions,
      actions,
      error,
      transactionState,
      dispatchTransactions,
    ]
  );

  return (
    // @ts-ignore
    <TransactionsContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </TransactionsContext.Provider>
  );
};
export default TransactionsProvider;
