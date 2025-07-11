import permissions from "../constants/permission";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const sidebarItems = [
  // {
  //   link: "/admin/dashboard",
  //   label: "Dashboard",
  //   sideBarName: "DASHBOARD",
  //   icon: DashboardIcon,
  //   permission: [
  //     permissions.SUPERADMIN,
  //     permissions.ADMINISTRATOR,
  //     permissions.VERIFIER,
  //     permissions.OPERATOR,
  //     permissions.SUPERVISOR,
  //   ],
  // },
  {
    link: "/grafana/dashboard",
    label: "Dashboard",
    sideBarName: "DASHBOARD",
    icon: DashboardIcon,
    permission: [
      permissions.SUPERADMIN,
    ],
  },
  {
    link: "/admin/user-management",
    label: "User Management",
    sideBarName: "USER_MANAGEMENT",
    icon: ManageAccountsIcon,
    permission: [
      permissions.SUPERADMIN,
      permissions.ADMINISTRATOR,
      permissions.VERIFIER,
      permissions.OPERATOR,
      permissions.SUPERVISOR,
    ],
  },
  {
    link: "/admin/logs",
    label: "Logs",
    sideBarName: "LOGS",
    icon: TextSnippetIcon,
    permission: [permissions.SUPERADMIN],
  },
  {
    link: "/admin/referrals",
    label: "Referrals",
    sideBarName: "REFERRALS",
    icon: PeopleIcon,
    permission: [
      permissions.SUPERAGENT,
      permissions.MASTERAGENT,
      permissions.AGENT,
    ],
  },
  {
    link: "/admin/transactions",
    label: "Transaction Report",
    sideBarName: "TRANSACTION",
    icon: PaidIcon,
    permission: [
      permissions.SUPERADMIN,
    ],
  },

];
