export enum GameState {
  Idle = "Idle",
  NewGame = "NewGame",
  Open = "Open",
  LastCall = "LastCall",
  Closed = "Closed",  // OR Finalized
  WinnerDeclared = "WinnerDeclared"
}

export enum ClientCommands {
  None = "None",
  Init = "Init",
  Bet = "Bet",
  SideBets = "SideBets",
}

export enum ModeratorCommands {
  Init = "Init",
  Restart = "Restart",
}

export const ZODIAC_LABELS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export const ZODIAC_COLORS = [
  "#CA4349",
  "#F2762F",
  "#E54F03",
  "#E5A602",
  "#E6CA10",
  "#56B988",
  "#03923D",
  "#00B5BC",
  "#0C6184",
  "#4F2787",
  "#84206C",
  "#A5214C",
];

export function hasValue(obj: any) {
  return obj !== null && obj !== undefined;
}

export const MODERATOR_MOBILE = "+639863687666";

export const MOBILE_NUMBERS = [
  "+639863686428",
  "+639715446452",
  "+639550863400",
  "+639763810435",
  "+639954401835",
  "+639981334205",
  "+639630388163",
  "+639208359082",
  "+639616543333",
  "+639266167459",
  "+639352143715",
  "+639615723457",
  "+639988380772",
];



export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export function mapToArray(map: Map<any, any>) {
  return Array.from(map.entries());
}

export function arrayToMap(map: [any, any][]): Map<any, any> {
  const mapArray: [any, any][] = map;
  return new Map<any, any>(mapArray);
}

export function jsonToMapArray(json) {
  let map = jsonToMap(json);
  return mapToArray(map);
}


function jsonToMap(json) {
  let map = new Map();
  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      map.set(key, json[key]);
    }
  }
  return map;
}