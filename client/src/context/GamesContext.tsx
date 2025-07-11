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
  gameReducer,
  gameInitialState,
  gameActions,
} from "../reducer/GameReducer";

export interface IGamesContext {
  gameState: any;
  gameMatchData: any;
  dispatchGames: React.Dispatch<any>;
  gameInitialState: {
    loading: boolean;
    error: boolean;
    errorType: string;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    data: object;
  };
  actions: {
    getGameMatch: (data: any) => void;
    openGameMatch: (data: any) => void;
    betGameMatch: (data: any) => void;
  };
}

// @ts-ignore
const GamesContext = createContext<IGamesContext>();

export const useGamesContext = () => {
  return useContext(GamesContext);
};

// @ts-ignore
const GamesProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();

  const [gameState, dispatchGames] = useReducer(gameReducer, {
    ...gameInitialState,
  });

  useEffect(() => {
    Object.keys(gameActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          gameActions[key](...args)(dispatchGames, stateRef.current);
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  const value = useMemo(
    () => ({
      actions,
      gameState,
      dispatchGames,
    }),
    [actions, gameState, dispatchGames]
  );

  return (
    // @ts-ignore
    <GamesContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </GamesContext.Provider>
  );
};
export default GamesProvider;
