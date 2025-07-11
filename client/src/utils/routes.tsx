import AuthGuard from "../components/AuthGuard";
import { Route } from "react-router-dom";
// import DefaultLayout from "../components/DefaultLayout";
import GameLayout from "../components/layout/GameLayout";
import { Suspense, lazy } from "react";
// @ts-ignore
import {
  UserManagementProvider,
  UserProfileProvider,
  LogsProvider,
  NotificationProvider,
  ReferralsProvider,
  TransactionsProvider,
  RegisterProvider,
  LoginProvider,
  VerifyMobileContext,
  HomeProvider,
  GamesProvider,
  GamesTransactions,
  WalletContext,
  PasscodeContext
} from "../context";
import { ROLES } from "../constants";
import CustomSuspense from "../components/LoadingInfo/CustomSuspense";

import LoadingInfo from "../components/LoadingInfo";

const lazyLoadComponent = (importFunction: any) => {
  const LazyComponent = lazy(importFunction);
  return (props: any) =>
    isMobile ? (
      <CustomSuspense fallback={<LoadingInfo />}>
        <LazyComponent {...props} />
      </CustomSuspense>
    ) : (
      <Suspense fallback={<LoadingInfo />}>
        <LazyComponent {...props} />
      </Suspense>
    );
};

const LazyDefaultLayout = lazyLoadComponent(
  () => import(`../components/DefaultLayout`)
);

const LazyClientLayout = lazyLoadComponent(
  () => import(`../components/layout/ClientLayout`)
);

import Login from "../pages/Login";
import Register from "../pages/Register";
import Verify from "../pages/Verify";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Wallet from "../pages/Wallet";
import Notification from "../pages/Notification";
import Transactions from "../pages/Transactions";
import Games from "../pages/Games";
import Promos from "../pages/Promos";
import UserProfile from "../pages/UserProfile";
import KYC from "../pages/KYC";
import UserManagement from "../pages/UserManagement";
import Player from "../pages/Player/Index";
import Logout from "../pages/Logout";
import GameLogout from "../pages/Games/mobile/zodiac/GameLogout";
import Log from "../pages/Log";
import Referrals from "../pages/Referrals";
import Passcode from "../pages/Passcode";
import { isMobile } from "react-device-detect";
import { Moderator } from "../pages";

export const PUBLIC_ROUTES = [
  {
    path: "/",
    component: <LazyClientLayout />,
    children: [
      {
        path: "/",
        name: "Home",
        element: Home,
        context: HomeProvider,
        role: [],
      },
      {
        path: "/home",
        name: "Home",
        element: Home,
        context: HomeProvider,
        role: [],
      },
      {
        path: "/games",
        element: Games,
        role: [],
      },
      {
        path: "/promos",
        name: "Promos",
        element: Promos,
        role: [],
      },
    ],
  },
  {
    path: "/login",
    component: (
      <LoginProvider>
        <Login />
      </LoginProvider>
    ),
  },
  {
    path: "/register",
    component: (
      <RegisterProvider>
        <Register />
      </RegisterProvider>
    ),
  },
  {
    path: "/verify/*",
    component: (
      <VerifyMobileContext>
        <Verify />
      </VerifyMobileContext>
    ),
  },
  { path: "/admin/logout", component: <Logout /> },
];

export const GAME_ROUTES = [
  {
    path: "/",
    component: <AuthGuard />,
    children: [
      {
        path: "/game",
        component: <GameLayout />,
      },
    ],
  },
  {
    path: "/transactions",
    name: "Transactions",
    element: Transactions,
    context: GamesTransactions,
    role: [],
  },
  {
    path: "/kyc",
    name: "KYC",
    role: [],
    element: KYC,
    context: UserProfileProvider,
  },
  {
    path: "/zodiac",
    name: "Player",
    role: [ROLES.PLAYER.name],
    element: Player,
  },
  {
    path: "/wallet",
    name: "Wallet",
    element: Wallet,
    context: WalletContext,
    role: [],
  },
  {
    path: "/notification",
    name: "Notification",
    element: Notification,
    context: NotificationProvider,
    role: [],
  },
  {
    path: "/moderator",
    name: "Moderator",
    role: [ROLES.MODERATOR.name],
    element: Moderator,
  },
  { path: "/logout", element: GameLogout },
  {
    path: "/profile",
    name: "UserProfile",
    role: [],
    element: UserProfile,
    context: UserProfileProvider,
  },
  {
    path: "/passcode",
    name: "Passcode",
    role: [],
    element: Passcode,
    context: PasscodeContext,
  },
 
  /*   {
    path: "/zodiac",
    name: "Zodiac",
    role: [],
    element: Zodiac,
    context: GamesProvider,
  }, */
];

export const PRIVATE_ROUTES = [
  {
    path: "/",
    component: <AuthGuard />,
    children: [
      {
        path: "/admin/",
        component: <LazyDefaultLayout />,
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    role: [
      ROLES.SUPERADMIN.name,
      ROLES.ADMINISTRATOR.name,
      ROLES.VERIFIER.name,
      ROLES.ADMINISTRATOR.name,
      ROLES.SUPERAGENT.name,
      ROLES.MASTERAGENT.name,
      ROLES.AGENT.name,
      ROLES.OPERATOR.name,
      ROLES.SUPERVISOR.name,
      ROLES.MODERATOR.name,
      ROLES.ACCOUNTING.name,
      ROLES.PLAYER.name,
    ],
    element: Dashboard,
  },
  {
    path: "/user-management/:id?",
    name: "UserManagement",
    role: [
      ROLES.SUPERADMIN.name,
      ROLES.ADMINISTRATOR.name,
      ROLES.SUPERVISOR.name,
      ROLES.VERIFIER.name,
      ROLES.OPERATOR.name,
      ROLES.SUPERAGENT.name,
      ROLES.MASTERAGENT.name,
    ],
    element: UserManagement,
    context: UserManagementProvider,
  },
  {
    path: "/profile",
    name: "UserProfile",
    role: [
      ROLES.SUPERADMIN.name,
      ROLES.ADMINISTRATOR.name,
      ROLES.VERIFIER.name,
      ROLES.ADMINISTRATOR.name,
      ROLES.SUPERAGENT.name,
      ROLES.MASTERAGENT.name,
      ROLES.AGENT.name,
      ROLES.OPERATOR.name,
      ROLES.SUPERVISOR.name,
      ROLES.MODERATOR.name,
      ROLES.ACCOUNTING.name,
      ROLES.PLAYER.name,
    ],
    element: UserProfile,
    context: UserProfileProvider,
  },

  {
    path: "/logs",
    name: "Logs",
    role: [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name],
    element: Log,
    context: LogsProvider,
  },
  {
    path: "/notification",
    name: "Notification",
    role: [
      ROLES.SUPERADMIN.name,
      ROLES.ADMINISTRATOR.name,
      ROLES.VERIFIER.name,
      ROLES.ADMINISTRATOR.name,
      ROLES.SUPERAGENT.name,
      ROLES.MASTERAGENT.name,
      ROLES.AGENT.name,
      ROLES.OPERATOR.name,
      ROLES.SUPERVISOR.name,
      ROLES.MODERATOR.name,
      ROLES.ACCOUNTING.name,
      ROLES.PLAYER.name,
    ],
    element: Notification,
    context: NotificationProvider,
  },
  {
    path: "/referrals",
    name: "Referrals",
    role: [ROLES.SUPERAGENT.name, ROLES.MASTERAGENT.name, ROLES.AGENT.name],
    element: Referrals,
    context: ReferralsProvider,
  },

  {
    path: "/transactions",
    name: "Transactions",
    element: Transactions,
    context: TransactionsProvider,
    role: [ROLES.SUPERADMIN.name, ROLES.ADMINISTRATOR.name],
  },
];

export const AUTH_ROUTES = [
  {
    path: "/",
    component: <AuthGuard />,
    children: [
      {
        path: "/admin/*",
        component: <LazyDefaultLayout />,
      },
      {
        path: "/game/*",
        component: <GameLayout />,
      },
    ],
  },
];

export const getPath = (arr: any, route: any) => {
  arr.push(route.path);
  if (route.children) {
    route.children.forEach((item: any) => getPath(arr, item));
  }

  return arr;
};

export const getPathTwo = (arr: any, route: any) => {
  let combinedParam: any = [];
  route.children.map((path: any) => {
    const firstParam = path.path.replace("/*", "");
    if (firstParam === "/admin") {
      PRIVATE_ROUTES_PATH.map((child: any) => {
        const segments = child.split("/");
        const firstSegment = segments[1];

        combinedParam.push(`${firstParam}/${firstSegment}`);
      });
    }
    if (firstParam === "/game") {
      GAME_ROUTES_PATH.map((child: any) => {
        const segments = child.split("/");
        const firstSegment = segments[1];

        combinedParam.push(`${firstParam}/${firstSegment}`);
      });
    }
  });
  arr.push(...combinedParam);
  return arr;
};

export const PUBLIC_ROUTES_PATH = PUBLIC_ROUTES.reduce(
  (curr, route) => getPath(curr, route),
  []
);

export const PRIVATE_ROUTES_PATH = PRIVATE_ROUTES.reduce(
  (curr, route) => getPath(curr, route),
  []
);

export const GAME_ROUTES_PATH = GAME_ROUTES.reduce(
  (curr, route) => getPath(curr, route),
  []
);

export const AUTH_ROUTES_PATH = AUTH_ROUTES.reduce(
  (curr, route) => getPathTwo(curr, route),
  []
);

export const LINKS_NO_LAYOUT = [
  "/game/kyc",
  "/game/profile",
  "/game/game/zodiac",
  "/game/wallet",
  "/game/notification",
  "/game/transactions",
  "/game/passcode",
];

export const renderRoute = (route: any) => {
  return (
    <Route path={route.path} element={route.component} key={route.path}>
      {route.children &&
        route.children.map((item: string) => {
          return renderRoute(item);
        })}
    </Route>
  );
};
