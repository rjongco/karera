// @ts-ignore
import useResizeObserver from "@react-hook/resize-observer";
import { useState, useLayoutEffect } from "react";
import { findIndex } from "lodash";
import moment from "moment";
import {
  ACTION_STATUS,
  ACTIVE,
  COMPLETED,
  DEACTIVATED,
  GENDER,
  GOVTIDS,
  INITIAL,
  PENDING,
  ROLES,
} from "../constants";
import { Chip, styled } from "@mui/material";
import { deleteCookie } from "../utils/cookie";
import { AUTH_ROUTES_PATH } from "./routes";
import { SUCCESS, FAILED } from "../constants";

// @ts-ignore
const Chipstyled = styled(({ bgColor, color, ...rest }) => <Chip {...rest} />)(
  // @ts-ignore
  ({ customprop, bgColor, color }) => ({
    // Define styles based on props or theme
    backgroundColor: bgColor,
    color: color,
  })
);

const formatTime = (time: any) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const fullName = (firstName: any, lastName: any) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else if (lastName) {
    return lastName;
  } else {
    return "Unnamed"; // Handle case when both firstName and lastName are empty
  }
};

const useSize = (target: any) => {
  const [size, setSize] = useState();

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  // @ts-ignore
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

const removePlusSixThree = (phone: any) =>
  phone ? `0${phone.replace(/^\+63/, "")}` : "No Mobile No.";

// @ts-ignore
const onClickSidebarSelected = (store, menus) => {
  // @ts-ignore
  store.sidebarItems.forEach((element) => {
    if (element.label === menus) {
      element["active"] = true;
    } else {
      element["active"] = false;
    }
  });
};

// @ts-ignore
const onClickBottomMenusMobileSelected = (store, menus) => {
  // @ts-ignore
  store.bottomMenusMobileItems.forEach((element) => {
    if (element.label === menus) {
      element["active"] = true;
    } else {
      element["active"] = false;
    }
  });
};

const onRefreshSidebarAutoSelect = (store: any) => {
  const currentURL = document.URL;
  const part = `/${currentURL.split("/")[4]}`;

  const stringPath = part === "/" ? "/dashboard" : part;

  let selectedMenu = "";
  const isDashboard = checkIfQueryUrl();

  if (!isDashboard) {
    findIndex(store.sidebarItems, (item: any) => {
      const part = `/${item.path.split("/")[2]}`;
      if (part === stringPath) {
        selectedMenu = item.label;
      }
    });
  }

  return selectedMenu;
};

const onRefreshBottomMenusMobileAutoSelect = (store: any) => {
  const currentURL = document.URL;

  const part = `/${currentURL.split("/")[3]}`;

  const stringPath = part === "/" ? "/home" : part;

  let selectedMenu = "";
  const isHome = checkIfQueryUrl();

  if (!isHome) {
    findIndex(store.bottomMenusMobileItems, (item: any) => {
      const part = `/${item.path.split("/")[1]}`;
      if (part === stringPath) {
        selectedMenu = item.label;
      }
    });
  }

  return selectedMenu;
};

const checkIfQueryUrl = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.has("userId") && urlParams.has("code");
};

const returnMommentDate = (date: any) => {
  return moment(`${date.year()}-${date.month() + 1}-${date.date()}`).format(
    "YYYY-MM-DD"
  );
};

const getDefaultDateFormat = (dateParam: any) => {
  if (dateParam) {
    const date = new Date(dateParam);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    // @ts-ignore
    return formattedDate;
  }
  return null;
};

const getDateActions = (date: any, customMess: any) => {
  if (date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  }
  return customMess;
};

const getDateActionsInModal = (date: any, customMess: any) => {
  if (date) {
    return moment(date).format("YYYY-MM-DD hh:mm A");
  }
  return customMess;
};

const getGovtId = (govtId: string) => {
  switch (govtId) {
    case GOVTIDS.NONE.name:
      return GOVTIDS.NONE.label;
    case GOVTIDS.DRIVERSLICENSE.name:
      return GOVTIDS.DRIVERSLICENSE.label;
    case GOVTIDS.UMID.name:
      return GOVTIDS.UMID.label;
    case GOVTIDS.POSTALID.name:
      return GOVTIDS.POSTALID.label;
    case GOVTIDS.PASSSPORT.name:
      return GOVTIDS.PASSSPORT.label;
    case GOVTIDS.SSSID.name:
      return GOVTIDS.SSSID.label;
    case GOVTIDS.PRCID.name:
      return GOVTIDS.PRCID.label;
    case GOVTIDS.HDMFID.name:
      return GOVTIDS.HDMFID.label;
    case GOVTIDS.NATIONALID.name:
      return GOVTIDS.NATIONALID.label;
    case GOVTIDS.PHILHEALTH.name:
      return GOVTIDS.PHILHEALTH.label;

    default:
      return null;
  }
};

const getRole = (role: string) => {
  switch (role) {
    case ROLES.SUPERADMIN.name:
      return ROLES.SUPERADMIN.label;
    case ROLES.ADMINISTRATOR.name:
      return ROLES.ADMINISTRATOR.label;
    case ROLES.SUPERVISOR.name:
      return ROLES.SUPERVISOR.label;
    case ROLES.VERIFIER.name:
      return ROLES.VERIFIER.label;
    case ROLES.OPERATOR.name:
      return ROLES.OPERATOR.label;
    case ROLES.SUPERAGENT.name:
      return ROLES.SUPERAGENT.label;
    case ROLES.MASTERAGENT.name:
      return ROLES.MASTERAGENT.label;
    case ROLES.AGENT.name:
      return ROLES.AGENT.label;
    case ROLES.MODERATOR.name:
      return ROLES.MODERATOR.label;
    case ROLES.ACCOUNTING.name:
      return ROLES.ACCOUNTING.label;
    case ROLES.PLAYER.name:
      return ROLES.PLAYER.label;
    default:
      return null;
  }
};

const getGender = (gender: any) => {
  switch (gender) {
    case GENDER.MALE.value:
      return GENDER.MALE.label;
    case GENDER.FEMALE.value:
      return GENDER.FEMALE.label;
    default:
      return null;
  }
};

const getActionStatus = (status: any) => {
  switch (status) {
    case ACTION_STATUS.APPROVED.name:
      return (
        <Chipstyled
          // @ts-ignore
          label={ACTION_STATUS.APPROVED.label}
          // @ts-ignore
          bgColor={ACTION_STATUS.APPROVED.bgColor}
          color={ACTION_STATUS.APPROVED.color}
        />
      );
    case ACTION_STATUS.FOR_APPROVAL.name:
      return (
        <Chipstyled
          // @ts-ignore
          label={ACTION_STATUS.FOR_APPROVAL.label}
          bgColor={ACTION_STATUS.FOR_APPROVAL.bgColor}
          color={ACTION_STATUS.FOR_APPROVAL.color}
        />
      );
    case ACTION_STATUS.DEACTIVE.name:
      return (
        <Chipstyled
          // @ts-ignore
          label={ACTION_STATUS.DEACTIVE.label}
          bgColor={ACTION_STATUS.DEACTIVE.bgColor}
          color={ACTION_STATUS.DEACTIVE.color}
        />
      );
    case ACTION_STATUS.FOR_DEACTIVE.name:
      return (
        <Chipstyled
          // @ts-ignore
          label={ACTION_STATUS.FOR_DEACTIVE.label}
          bgColor={ACTION_STATUS.FOR_DEACTIVE.bgColor}
          color={ACTION_STATUS.FOR_DEACTIVE.color}
        />
      );
    case ACTION_STATUS.DENIED.name:
      return (
        <Chipstyled
          // @ts-ignore
          label={ACTION_STATUS.DENIED.label}
          bgColor={ACTION_STATUS.DENIED.bgColor}
          color={ACTION_STATUS.DENIED.color}
        />
      );

    default:
      return (
        <Chipstyled
          // @ts-ignore
          label={ACTION_STATUS.NEW.label}
          bgColor={ACTION_STATUS.NEW.bgColor}
          color={ACTION_STATUS.NEW.color}
        />
      );
  }
};

const notifCount = (count: number) => (count >= 100 ? `99+` : count);

const uniqueFilename = `${Date.now()}-${Math.random()
  .toString(36)
  .substring(2, 15)}.jpg`;

const catchError = (error: any) => {
  const pathname = window.location.pathname;

  // Split the pathname by "/"
  const parts = pathname.split("/");

  // Get the first and second parameters
  const firstParam = parts[1];
  const secondParam = parts[2];
  const currentPram = `${firstParam}/${secondParam}`;
  if (
    error.response &&
    error.response.status === 401 &&
    // @ts-ignore
    AUTH_ROUTES_PATH.includes(currentPram)
  ) {
    deleteCookie("token");
    window.location.href = window.location.origin + "/admin/logout";
  }
  // eslint-disable-next-line no-throw-literal
  throw {
    status: error.response.data.status,
    type: error.response.data.type,
    message: error.response.data.message,
  };
};

const removeTrailingDot = (word: any) => {
  // Check if the word ends with a period
  if (word.endsWith(".")) {
    // Remove the period only if there are no decimal digits following it
    if (!/\.\d+$/.test(word)) {
      return word.slice(0, -1); // Remove the last character (period)
    }
  }
  return word; // Return the word unchanged
};

const isEmptyName = (name: any, mobile: any) => {
  return name === " " ? mobile : name;
};

const numWithS = (word: any, numbers: any) => {
  return numbers > 1 ? `${word}s` : word;
};

const numberShort = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 10000) {
    return Math.floor(num / 1000).toFixed(1) + "K";
  } else if (num >= 1000) {
    return Math.floor(num / 100) + "K";
  } else {
    return num.toString();
  }
};

const numberShortRace = (num: number) => {
  const indexToNum = num + 1;
  if (indexToNum === 1) {
    return "1ST";
  } else if (indexToNum === 2) {
    return "2ND";
  } else if (indexToNum === 3) {
    return "3RD";
  } else if (indexToNum === 4) {
    return "4TH";
  }
};

const isEmptyAddrs = (field: any) => {
  return field ? `${field},` : "";
};

const capitalizeFirstLetter = (string: any) => {
  if (string) {
    const allLowChars = string.toLowerCase();
    return allLowChars[0].toUpperCase() + allLowChars.slice(1);
  }
  return "";
};

const allSmallLetters = (string: any) => {
  if (string) {
    return string.toLowerCase();
  }
  return "";
};

const paymentStatus = (status: any) => {
  const statusSM = allSmallLetters(status);
  if (statusSM === INITIAL) {
    return PENDING;
  } else if (statusSM === SUCCESS) {
    return COMPLETED;
  } else if (statusSM === FAILED) {
    return FAILED;
  }
  return "";
};

const deactivatedStatus = (status: any) => {
  if (status === ACTIVE) {
    return <Chip label="Active" color="success" />;
  } else if (status === DEACTIVATED) {
    return <Chip label="Deactivated" color="error" />;
  }
};


const getFirstParamURL = () => {
  const currentUrl = window.location.href;
  const urlObject = new URL(currentUrl);
  const pathname = urlObject.pathname;
  const parts = pathname.split("/");
  return parts[1];
};

function getCurrentDateTimeString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// This is for adding address city and barangay
const removeBarangayWord = (data:any) => { // get city in array ex: ["BANGUED","BOLINEY"] for province of ABRA
  const transformedData:any = {};
  Object.keys(data).forEach(key => {
    transformedData[key] = data[key].barangay_list;
  });
  console.log(transformedData);
}

const getKeysOnlyPlace = (data:any) => { // get barangays ex: "BANGUED":["AGTANGAO","ANGAD"] for the city of BANGUED
  const arr = Object.keys(data);
  console.log(arr); 
}
// End of adding address city and barangay

export {
  fullName,
  formatTime,
  useSize,
  onClickSidebarSelected,
  onClickBottomMenusMobileSelected,
  onRefreshSidebarAutoSelect,
  onRefreshBottomMenusMobileAutoSelect,
  removePlusSixThree,
  checkIfQueryUrl,
  returnMommentDate,
  getDefaultDateFormat,
  getDateActions,
  getDateActionsInModal,
  getRole,
  getGovtId,
  getGender,
  getActionStatus,
  notifCount,
  uniqueFilename,
  catchError,
  removeTrailingDot,
  isEmptyName,
  numWithS,
  numberShort,
  numberShortRace,
  isEmptyAddrs,
  capitalizeFirstLetter,
  allSmallLetters,
  paymentStatus,
  deactivatedStatus,
  getFirstParamURL,
  getCurrentDateTimeString,
  removeBarangayWord,
  getKeysOnlyPlace
};
