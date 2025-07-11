import sidebarMenuProfile from "../assets/images/sidebar-menu-profile.png";
import sidebarMenuKYC from "../assets/images/sidebar-menu-kyc.png";
import sidebarMenuPhone from "../assets/images/sidebar-menu-phone.png";
import lockIcon from "../assets/images/lock-icon.png";

export const sidebarItemsMobile = [
  {
    link: "/game/profile",
    label: "Profile",
    sideBarName: "PROFILE",
    icon: sidebarMenuProfile,
  },
  {
    link: "/game/kyc",
    label: "KYC Settings",
    sideBarName: "KYC",
    icon: sidebarMenuKYC,
  },
  {
    link: "/profile/mobile",
    label: "Mobile Number",
    sideBarName: "MOBILE_NUMBER",
    icon: sidebarMenuPhone,
  },
  {
    link: "/game/passcode",
    label: "Create Wallet Passcode",
    sideBarName: "PASSCODE",
    icon: lockIcon,
  },
];
