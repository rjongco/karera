// export const INITIAL_SIDEBAR = {
//   items: [
//     {
//       label: "DASHBOARD",
//       active: true,
//       path: "/dashboard",
//     },
//     {
//       label: "USER_MANAGEMENT",
//       active: false,
//       path: "/user-management",
//     },
//     {
//       label: "SETTINGS",
//       active: false,
//       path: "/settings",
//     },
//   ],
// };

export const INITIAL_SIDEBAR = {
  sidebarItems: [
    {
      label: "DASHBOARD",
      active: true,
      path: "/admin/dashboard",
    },
    {
      label: "USER_MANAGEMENT",
      active: false,
      path: "/admin/user-management",
    },
    {
      label: "LOGS",
      active: false,
      path: "/admin/logs",
    },
    {
      label: "REFERRALS",
      active: false,
      path: "/admin/referrals",
    },
    {
      label: "TRANSACTIONS",
      active: false,
      path: "/admin/transactions",
    },
  ],
};

export const INITIAL_BOTTOM_MENUS_MOBILE = {
  bottomMenusMobileItems: [
    {
      label: "HOME",
      active: true,
      path: "/home",
    },
    {
      label: "WALLET",
      active: false,
      path: "/wallet",
    },
    {
      label: "GAMES",
      active: false,
      path: "/games",
    },
    {
      label: "PROMOS",
      active: false,
      path: "/promos",
    },
    {
      label: "MORE",
      active: false,
      path: "/more",
    },
  ],
};

export const INITIAL_USER = {
  auth: {
    govtPicture: "",
  },
};
