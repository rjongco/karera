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
  homeReducer,
  homeInitialState,
  homeActions,
} from "../reducer/HomeReducer";

import { getGamesAPI } from "../api/homeAPI";
import useSWR from "swr";

export interface IHomeContext {
  homeState: any;
  dispatchHome: React.Dispatch<any>;
  homeInitialState: {
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
const HomeContext = createContext<IHomeContext>();

export const useHomeContext = () => {
  return useContext(HomeContext);
};

// @ts-ignore
const HomeProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();

  const getGames = async () => {
    const response = await getGamesAPI();
    return response?.data;
  };

  const { data: games } = useSWR("/home/games", getGames, {
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const [homeState, dispatchHome] = useReducer(homeReducer, {
    ...homeInitialState,
  });

  useEffect(() => {
    Object.keys(homeActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          homeActions[key](...args)(dispatchHome, stateRef.current);
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = homeState;
  }, [homeState]);

  const value = useMemo(
    () => ({
      games,
      actions,
      homeState,
      dispatchHome,
    }),
    [games, actions, homeState, dispatchHome]
  );

  return (
    // @ts-ignore
    <HomeContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </HomeContext.Provider>
  );
};
export default HomeProvider;
