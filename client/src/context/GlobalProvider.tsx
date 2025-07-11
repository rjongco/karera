import { createContext, useEffect, useState } from "react";
import {
  INITIAL_BOTTOM_MENUS_MOBILE,
  INITIAL_SIDEBAR,
  INITIAL_USER,
} from "../constants/context";
import {
  onClickSidebarSelected,
  onClickBottomMenusMobileSelected,
  onRefreshSidebarAutoSelect,
  onRefreshBottomMenusMobileAutoSelect,
} from "../utils/logic";

// @ts-ignore
export interface IGlobal {
  auth: any;
  openSideBar: boolean;
  openBottomMenusMobile: boolean;
  openGameSideBar: boolean;
  bets: object;
  top4Winners: any[];
  setAuthInfo:any;
}

// @ts-ignore
export const GlobalContext = createContext<IGlobal>({
  openSideBar: true,
  openBottomMenusMobile: true,
  openGameSideBar: false,
  bets: {},
  top4Winners: [],
  ...INITIAL_SIDEBAR,
  ...INITIAL_BOTTOM_MENUS_MOBILE,
  ...INITIAL_USER,
});

const INITIAL_STORE = {
  openSideBar: true,
  openGameSideBar: false,
  bets: {},
  top4Winners: [],
  ...INITIAL_SIDEBAR,
  ...INITIAL_BOTTOM_MENUS_MOBILE,
  ...INITIAL_USER,
};

const getInitialState = () => {
  const layout = localStorage.getItem("layout");
  return layout ? JSON.parse(layout) : INITIAL_STORE;
};

// @ts-ignore
const GlobalProvider = ({ children }) => {
  const [store, setStore] = useState(getInitialState);
  const [onRefresh, setOnRefresh] = useState(true);
  const [onRefreshBottomMenusMobile, setOnRefreshBottomMenusMobile] =
    useState(true);

  const handleOnRefreshSidebarAutoSelect = (store: any) => {
    const array = onRefreshSidebarAutoSelect(store);
    setSidebarItems(array);
  };

  const handleOnRefreshBottomMenusMobileAutoSelect = (store: any) => {
    const array = onRefreshBottomMenusMobileAutoSelect(store);
    setBottomMenusMobileItems(array);
  };

  useEffect(() => {
    localStorage.setItem("layout", JSON.stringify(store));
    onRefresh ? handleOnRefreshSidebarAutoSelect(store) : null;
  }, [store, onRefresh]);

  useEffect(() => {
    localStorage.setItem("layout", JSON.stringify(store));
    onRefreshBottomMenusMobile
      ? handleOnRefreshBottomMenusMobileAutoSelect(store)
      : null;
  }, [store, onRefreshBottomMenusMobile]);

  const setOpenSideBar = (openSideBar: any) => {
    setStore((curr: any) => ({ ...curr, openSideBar }));
  };

  const setOpenBottomMenusMobileSideBar = (bottomMenusMobileItems: any) => {
    setStore((curr: any) => ({ ...curr, bottomMenusMobileItems }));
  };

  const setAuthInfo = (auth: any) => {
    setStore((curr: any) => ({
      ...curr,
      auth,
    }));
  };

  const setTop4Winners = (top4Winners: any) => {
    setStore((curr: any) => ({
      ...curr,
      top4Winners,
    }));
  };

  const setBets = (bets: any) => {
    setStore((curr: any) => ({
      ...curr,
      bets,
    }));
  };

  const setOpenGameSideBar = (open: any) => {
    setStore((curr: any) => ({
      ...curr,
      openGameSideBar: open,
    }));
  };

  const setSidebarItems = (menus: any) => {
    setOnRefresh(false);
    onClickSidebarSelected(store, menus);
    setStore((curr: any) => ({
      ...curr,
      openSideBar: store.openSideBar,
      sidebarItems: store.sidebarItems,
    }));
  };

  const setBottomMenusMobileItems = (menus: any) => {
    setOnRefreshBottomMenusMobile(false);

    onClickBottomMenusMobileSelected(store, menus);
    setStore((curr: any) => ({
      ...curr,
      openBottomMenusMobile: store.openBottomMenusMobile,
      bottomMenusMobileItems: store.bottomMenusMobileItems,
    }));
  };

  const clearLayout = () => {
    setStore(INITIAL_STORE);
  };

  return (
    <GlobalContext.Provider
      value={{
        ...store,
        clearLayout,
        setOpenSideBar,
        setSidebarItems,
        setOpenBottomMenusMobileSideBar,
        setBottomMenusMobileItems,
        setAuthInfo,
        setTop4Winners,
        setBets,
        setOpenGameSideBar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
