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
  walletReducer,
  walletInitialState,
  walletActions,
} from "../reducer/WalletReducer";

import useSWR from "swr";
import { getPaymentCardsAPI } from "../api/walletAPI";

export interface IWallet {
  walletState: any;
  paymentCards: any;
  mutatePaymentCards: any;
  dispatchWallet: React.Dispatch<any>;
  walletInitialState: {
    loading: boolean;
    error: boolean;
    errorType: string;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    data: any[];
  };
  actions: {
    addGameDeposit: (param: any) => void;
    addGameWithdraw: (param: any) => void;
    addPaymentCard: (param: any) => void;
    authPinCode: (param: any) => void;
  };
}

// @ts-ignore
const WalletContext = createContext<IWallet>();

export const useWalletContext = () => {
  return useContext(WalletContext);
};

// @ts-ignore
const WalletProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();

  const [walletState, dispatchWallet] = useReducer(walletReducer, {
    ...walletInitialState,
  });

  const getPaymentCards = async () => {
    const response = await getPaymentCardsAPI();
    return response?.data;
  };

  const { data: paymentCards, mutate: mutatePaymentCards } = useSWR(
    "/game/users/payment/cards",
    getPaymentCards,
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    Object.keys(walletActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          walletActions[key](...args)(dispatchWallet, stateRef.current);
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = walletState;
  }, [walletState]);

  const value = useMemo(
    () => ({
      actions,
      paymentCards,
      walletState,
      mutatePaymentCards,
      dispatchWallet,
    }),
    [actions, paymentCards, walletState, mutatePaymentCards, dispatchWallet]
  );

  return (
    // @ts-ignore
    <WalletContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </WalletContext.Provider>
  );
};
export default WalletProvider;
