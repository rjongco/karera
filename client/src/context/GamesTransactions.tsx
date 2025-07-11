import {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
  useReducer,
} from "react";

import { useGamesTransactions } from "../utils/hooks/gamesTransactionsHook";
import {
  gamesTransactionsReducer,
  gamesTransactionsInitialState,
  gamesTransactionsActions,
  // @ts-ignore
} from "../reducer/GamesTransactionsReducer";

export interface IGamesTransactions {
  gamesTransactionsData: any;
  gamesTransactionsState: any;
  dispatchGamesTransactions: React.Dispatch<any>;
  gamesTransactionstInitialState: {
    loading: boolean;
    error: boolean;
    errorType: string;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    data: any[];
  };
  actions: {};
  size: any;
  page: any;
  setPage: any;
  setSize: any;
  optimizedFn: any;
  optimizedSubmitFn: any;
  mutateGamesTransactions: any;
  error: any;
  transactionState: any;
}

// @ts-ignore
const GamesTransactionsContext = createContext<IGamesTransactions>();

export const useGamesTransactionsContext = () => {
  return useContext(GamesTransactionsContext);
};

// @ts-ignore
const GamesTransactionsProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();
  const [sorted, setSorted] = useState("");
  const [searchData, setSearchData] = useState(null);

  const [transactionState, dispatchGamesTransactions] = useReducer(
    gamesTransactionsReducer,
    {
      ...gamesTransactionsInitialState,
    }
  );

  // @ts-ignore
  const {
    data: gamesTransactionsData,
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
    mutate: mutateGamesTransactions,
    // @ts-ignore
  } = useGamesTransactions("/admin/game/transactions", setSearchData);

  useEffect(() => {
    mutateGamesTransactions();
  }, [
    searchVal,
    mutateGamesTransactions,
    size,
    page,
    gamesTransactionsData,
    optimizedSubmitFn,
  ]);

  useEffect(() => {
    Object.keys(gamesTransactionsActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          gamesTransactionsActions[key](...args)(
            dispatchGamesTransactions,
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
      gamesTransactionsData,
      mutateGamesTransactions,
      actions,
      error,
      transactionState,
      dispatchGamesTransactions,
    }),
    [
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      gamesTransactionsData,
      mutateGamesTransactions,
      actions,
      error,
      transactionState,
      dispatchGamesTransactions,
    ]
  );

  return (
    // @ts-ignore
    <GamesTransactionsContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </GamesTransactionsContext.Provider>
  );
};
export default GamesTransactionsProvider;
