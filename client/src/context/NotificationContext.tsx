import {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
  useMemo,
  useReducer,
} from "react";

import { useNotification } from "../utils/hooks/notificationHook";
import {
  notificationReducer,
  notificationInitialState,
  notificationActions,
} from "../reducer/NotificationReducer";
import { getFirstParamURL } from "../utils/logic";

export interface INotification {
  notificationState: any;
  dispatchNotification: React.Dispatch<any>;
  notificationInitialState: {
    loading: boolean;
    error: boolean;
    errorType: string;
    errorMessage: string;
    success: boolean;
    successMessage: string;
    notification: any[];
  };
  actions: {};
}

// @ts-ignore
const NotificationContext = createContext<INotification>();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

// @ts-ignore
const NotificationProvider = ({ children }) => {
  const [actions, setActions] = useState({});
  const stateRef = useRef();
  const [sorted, setSorted] = useState("");
  const [searchData, setSearchData] = useState(null);

  const [notificationState, dispatchNotification] = useReducer(
    notificationReducer,
    {
      ...notificationInitialState,
    }
  );

  // @ts-ignore
  const {
    data: notificationData,
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
    mutate: mutateNotification,
    // @ts-ignore
  } = useNotification("/admin/notification", setSearchData);

  useEffect(() => {
    mutateNotification();
  }, [
    searchVal,
    mutateNotification,
    size,
    page,
    notificationData,
    optimizedSubmitFn,
  ]);

  useEffect(() => {
    Object.keys(notificationActions).forEach((key) => {
      setActions((curr) => ({
        ...curr,
        // @ts-ignore
        [key]: (...args) => {
          // @ts-ignore
          notificationActions[key](...args)(
            dispatchNotification,
            stateRef.current
          );
        },
      }));
    });
  }, []);

  useEffect(() => {
    stateRef.current = notificationState;
  }, [notificationState]);

  const value = useMemo(
    () => ({
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      notificationData,
      mutateNotification,
      actions,
      error,
      notificationState,
      dispatchNotification,
    }),
    [
      page,
      size,
      setPage,
      setSize,
      optimizedFn,
      optimizedSubmitFn,
      notificationData,
      mutateNotification,
      actions,
      error,
      notificationState,
      dispatchNotification,
    ]
  );

  return (
    // @ts-ignore
    <NotificationContext.Provider value={value}>
      {children}
      {/* @ts-ignore*/}
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;
