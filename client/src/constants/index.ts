import homeZodiacRaceGameListBanner from "../assets/images/home-zodiacrace-gamelist-banner.jpg";
import homeLaglagGameListBanner from "../assets/images/home-laglag-gamelist-banner.png";
import { FilterTypeData, FilterTypeOptionData } from "../types";

export const API_URL = import.meta.env.VITE_API_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
export const API_URL_PREFIX = `api/v1`;
export const BASE_URL = `${API_URL}/${API_URL_PREFIX}`;
export const DRAWER_WIDTH = 280;

export const VARIANT = {
  CONSTANT: "CONSTANT",
  TABLE: "TABLE",
  ROW: "ROW",
  BOX: "BOX",
};

export const USER_MANAGEMENT_TABLE = "USER_MANAGEMENT_TABLE";
export const LOGS_TABLE = "LOGS_TABLE";
export const REFERRAL_TABLE = "REFERRAL_TABLE";
export const NOTIFICATION_TABLE = "NOTIFICATION_TABLE";
export const TRANSACTIONS_TABLE = "TRANSACTIONS_TABLE";
export const TRANSACTIONS_EXPORT_EXCEL = "TRANSACTIONS_EXPORT_EXCEL";

export const IMAGE_URL_USER = `${BASE_URL}/admin/images/profile-pictures`;
export const IMAGE_URL_GOVT = `${BASE_URL}/admin/images/govt-pictures`;

export const TERMS_AND_CONDITION_CONTENT = "TERMS_AND_CONDITION_CONTENT";
export const PRIVATE_PRIVACY = "PRIVATE_PRIVACY";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const KYC = "KYC";
export const USER_PROFILE = "USER_PROFILE";
export const BET_WINNER = "BET_WINNER";
export const NEW_GAME = "NEW_GAME";
export const TRANSACTIONS_MODAL = "TRANSACTIONS_MODAL";
export const FILTER_MODAL = "FILTER_MODAL";

export const ALL = "all";
export const DEPOSIT = "deposit";
export const DEPOSIT_SUCCESS = "deposit_success";
export const WITHDRAW_SUCCESS = "withdraw_success";
export const WITHDRAW = "withdraw";
export const ADD_CARD = "add_card";
export const QR_CODE = "qr_code";
export const TAKE_PICTURE = "take_picture";
export const UPLOAD_PICTURE = "upload_picture";
export const CAMERA_FRONT = "camera_front";
export const CAMERA_BACK = "camera_back";
export const PIN_CODE = "pin_code";
export const WITHDRAW_NOT_AVAILABLE = "withdraw_not_available";
export const WITHDRAWAL = "withdrawal";
export const WONPRIZE = "wonprize";
export const BET = "bet";
export const INITIAL = "initial";
export const PENDING = "pending";
export const SUCCESS = "success";
export const INFO = "info";

export const COMPLETED = "completed";
export const FAILED = "failed";
export const GAME = "game";
export const ADMIN = "admin";
export const WELCOME = "welcome";

export const INPUT = "input";
export const SELECT = "select";
export const DATE = "date";

export const FILTER = {
  DATE: "createdDate",
  STATUS: "status",
};

export const ACTIVE = "active"
export const DEACTIVATED = "deactivated"

export const ADD_USER = "ADD USER";
export const DELETE_USER = "DELETE_USER";
export const RESTORE_USER = "RESTORE_USER";

export const USER_MANAGEMENT_NOTIFY = `A new update has been made`;

export const USER_MANAGEMENT_MODALS = {
  ADD_USER: { name: "ADD_USER", title: "ADD USER" },
  FILTER_USER: { name: "FILTER_USER", title: "FILTER USER" },
  EXPORT_EXCEL_USER: { name: "EXPORT_EXCEL_USER", title: "EXPORT EXCEL USER" },
  PROFILE: { name: "PROFILE", title: "PROFILE" },
  EDIT_PROFILE: { name: "EDIT_PROFILE", title: "EDIT PROFILE" },
  PROFILE_PICTURE: { name: "PROFILE_PICTURE", title: "PROFILE PICTURE" },
  ADD_CREDIT: { name: "ADD_CREDIT", title: "ADD CREDIT" },
};

export const USER_FILTER_BY:FilterTypeOptionData[] = [
  { id:1, label: "Full Name", name:"name" },
  { id:2, label: "Account ID", name:"accountId"},
  { id:3, label: "Role", name:"role" },
  { id:4, label: "Gender", name:"gender" },
  { id:5, label: "Birthdate", name:"birthdate" },
  { id:6, label: "Date of Birth", name:"dob" },
  { id:7, label: "Nationality", name:"nationalities" },
  { id:8, label: "Nature of Work", name:"natureOfWork" },
  { id:9, label: "Source of Income", name:"sourceOfIncome" },
  { id:10, label: "Mobile", name:"mobile" },
  { id:11, label: "Email", name:"email" },
  { id:12, label: "Place of Birth", name:"placeOfBirth" },
  { id:14, label: "Address", name:"address" },
  { id:17, label: "Government ID", name:"govtId" },
  { id:18, label: "Status", name:"status" },
]

export const TRANSACTION_FILTER_BY:FilterTypeOptionData[] = [
  { id:1, label: "Reference ID.", name:"callbackId" },
  { id:2, label: "Amount", name:"amount"},
  { id:3, label: "Type", name:"type" },
  { id:4, label: "Status", name:"status" },
  { id:5, label: "Player", name:"playerName" },
  { id:7, label: "Game ID", name:"game_id" },
]

export const ROLES_SELECT_OPTIONS = [
  { name: "superadmin", label: "Super Admin" },
  { name: "admin", label: "Admin" },
  { name: "verifier", label: "Verifier" },
  { name: "superagent", label: "Super Agent" },
  { name: "masteragent", label: "Master Agent" },
  { name: "agent", label: "Agent" },
  { name: "operator", label: "Operator" },
  { name: "supervisor", label: "Supervisor" },
  { name: "moderator", label: "Moderator" },
  { name: "accounting", label: "Accounting" },
  { name: "player", label: "Player" },
]

export const GENDER_SELECT_OPTIONS = [
  { name: "0", label: "Male" },
  { name: "1", label: "Female" },
]

export const STATUS_SELECT_OPTIONS = [
  { name: "all", label: "All" },
  { name: "active", label: "Active" },
  { name: "deactivated", label: "Deactivated" },
]

export const TRANSACTION_TYPE = [
  { name: "withdrawal", label: "Withdraw" },
  { name: "deposit", label: "Deposit" },
  { name: "bet", label: "Bet" },
  { name: "wonprize", label: "Wonprize" },
]

export const TRANSACTION_STATUS = [
  { name: "INITIAL", label: "Initial" },
  { name: "SUCCESS", label: "Success" },
  { name: "FAILED", label: "Failed" },
]

const ROLES = {
  SUPERADMIN: {
    name: "superadmin",
    label: "Super Admin",
    bgColor: "#379f86",
    color: "#ffffff",
  },
  ADMINISTRATOR: {
    name: "admin",
    label: "Admin",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  VERIFIER: {
    name: "verifier",
    label: "Verifier",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  SUPERAGENT: {
    name: "superagent",
    label: "Super Agent",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  MASTERAGENT: {
    name: "masteragent",
    label: "Master Agent",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  AGENT: {
    name: "agent",
    label: "Agent",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  OPERATOR: {
    name: "operator",
    label: "Operator",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  SUPERVISOR: {
    name: "supervisor",
    label: "Supervisor",
    bgColor: "#62b1d2",
    color: "#ffffff",
  },
  MODERATOR: {
    name: "moderator",
    label: "Moderator",
    bgColor: "#222d39",
    color: "#ffffff",
  },
  ACCOUNTING: {
    name: "accounting",
    label: "Accounting",
    bgColor: "#ecd50a",
    color: "#ffffff",
  },
  PLAYER: {
    name: "player",
    label: "Player",
    bgColor: "#7F00FF",
    color: "#ffffff",
  },
};

export const GAMES_LABEL = {
  ZODIAC: "zodiac",
  LAGLAG: "laglag",
  LETRA_KARERA: "letra-karera",
};

export const GAMES_DATA = [
  {
    id: "1",
    name: "zodiac",
    label: "Zodiac",
    banner: homeZodiacRaceGameListBanner,
  },
  {
    id: "2",
    name: "laglag",
    label: "Laglag",
    banner: homeLaglagGameListBanner,
  },
  {
    id: "3",
    name: "letra-karera",
    label: "Letra-Karera",
    banner: homeZodiacRaceGameListBanner,
  },
];

export const TRANSACTION_TYPE_SELECT = [
  { name: "deposit", label: "Deposit" },
  { name: "withdrawal", label: "Withdrawal" },
  { name: "bet", label: "Bet" },
  { name: "wonprize", label: "Won Prize" },
  { name: "load", label: "Load" },
];

export const TRANSACTION_STATUS_SELECT = [
  { name: "SUCCESS", label: "Success" },
  { name: "INITIAL", label: "Initial" },
  { name: "FAILED", label: "Failed" },
];

export const ROLES_REFERRALS_SELECT = [
  { name: ROLES.MASTERAGENT.name, label: ROLES.MASTERAGENT.label },
  { name: ROLES.AGENT.name, label: ROLES.AGENT.label },
  { name: ROLES.PLAYER.name, label: ROLES.PLAYER.label },
];

export const ZODIACS = {
  ARIES: "aries",
  CANCER: "cancer",
  LIBRA: "libra",
  CAPRICORN: "capricorn",
  TAURUS: "taurus",
  LEO: "leo",
  SCORPIO: "scorpio",
  AQUARIUS: "aquarius",
  GEMINI: "gemini",
  VIRGO: "virgo",
  SAGITTARIUS: "sagittarius",
  PISCES: "pisces",
};

export const GAME_MATCH_STATUS = {
  INITIAL: {
    name: "initial",
    label: "INITIAL",
  },
  OPEN: {
    name: "open",
    label: "OPEN",
  },
  LASTCALL: {
    name: "lastcall",
    label: "LASTCALL",
  },
  CLOSED: {
    name: "closed",
    label: "CLOSED",
  },
  WINNERS: {
    name: "winners",
    label: "WINNERS",
  },
};

export const ZODIACS_BET_PRICE = {
  ["10"]: "10",
  ["20"]: "20",
  ["50"]: "50",
  ["100"]: "100",
  ["500"]: "500",
  ["ALLIN"]: "ALLIN",
};

export const CREDITS_MODALS = {
  ADD_CREDITS: { name: "ADD_CREDITS", title: "ADD CREDITS" },
};

export const PAGES = {
  USER_MANAGEMENT: { name: "user-management" },
  PROFILE: { name: "profile" },
  CREDITS: { name: "credits" },
  REFERRALS: { name: "referrals" },
};

export const LEFT_SIDEBAR_MOBILE = {
  PROFILE: {
    name: "PROFILE",
    label: "Profile",
  },
  KYC: {
    name: "KYC",
    label: "KYC",
  },
  MOBILE_NUMBER: {
    name: "MOBILE_NUMBER",
    label: "Mobile Number",
  },
  FAQS: {
    name: "FAQS",
    label: "Faqs",
  },
  SUPPORTS: {
    name: "SUPPORTS",
    label: "Supports",
  },
};

const GENDER = {
  MALE: {
    name: "male",
    label: "Male",
    value: 1,
  },
  FEMALE: {
    name: "female",
    label: "Female",
    value: 2,
  },
};

const ACTION_STATUS = {
  NEW: {
    name: "new",
    label: "New",
    color: "white",
    bgColor: "orange",
  },
  FOR_APPROVAL: {
    name: "forapproval",
    label: "For Approval",
    color: "black",
    bgColor: "yellow",
  },
  FOR_DEACTIVE: {
    name: "fordeactive",
    label: "For Disappproved",
    color: "black",
    bgColor: "#ff9999",
  },
  DEACTIVE: {
    name: "deactive",
    label: "Disapproved",
    color: "white",
    bgColor: "red",
  },
  DENIED: {
    name: "denied",
    label: "Denied",
    color: "white",
    bgColor: "black",
  },
  APPROVED: {
    name: "approved",
    label: "Approved",
    color: "white",
    bgColor: "green",
  },
};

const GOVTIDS = {
  NONE: {
    name: "0",
    label: "",
  },
  DRIVERSLICENSE: {
    name: "1",
    label: "Driver's License",
  },
  UMID: {
    name: "2",
    label: "UMID",
  },
  POSTALID: {
    name: "3",
    label: "Postal ID",
  },
  PASSSPORT: {
    name: "4",
    label: "Passport",
  },
  SSSID: {
    name: "5",
    label: "SSS ID",
  },
  PRCID: {
    name: "6",
    label: "PRC ID",
  },
  HDMFID: {
    name: "7",
    label: "HDMF ID",
  },
  NATIONALID: {
    name: "8",
    label: "National ID",
    bgColor: "#ecd50a",
    color: "#ffffff",
  },
  PHILHEALTH: {
    name: "9",
    label: "ePhil ID",
  },
};

export const govTypeSelect = [
  { code: "0", name: "Select Gov't ID" },
  { code: "1", name: "Driver's License" },
  { code: "2", name: "UMID" },
  { code: "3", name: "Postal ID" },
  { code: "4", name: "Passport" },
  { code: "5", name: "SSS ID" },
  { code: "6", name: "PRC ID" },
  { code: "7", name: "HDMF ID" },
  { code: "8", name: "National ID" },
  { code: "9", name: "ePhil ID" },
];

const NATIONALITIES = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguan and Barbudan",
  "Argentine",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian and Herzegovinian",
  "Botswanan",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese (Congo)",
  "Congolese (DRC)",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djiboutian",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirati (United Arab Emirates)",
  "English",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinean",
  "Guinea-Bissauan",
  "Guyanese",
  "Haitian",
  "Honduran",
  "Hungarian",
  "I-Kiribati",
  "Icelandic",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kittian and Nevisian",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourgish",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivian",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Montenegrin",
  "Moroccan",
  "Mosotho",
  "Motswana (Botswana)",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerien",
  "Nigerian",
  "North Korean",
  "Northern Irish",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Palestinian",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovakian",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "South Sudanese",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Turkmen",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbekistani",
  "Vanuatuan",
  "Vatican",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemeni",
  "Zambian",
  "Zimbabwean",
];

export { ROLES, GOVTIDS, GENDER, NATIONALITIES, ACTION_STATUS };
