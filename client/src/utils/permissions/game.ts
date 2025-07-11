import { GAME_MATCH_STATUS } from "../../constants";

const notOpen = (gameStatus: string) =>
  [
    GAME_MATCH_STATUS.OPEN.name,
    GAME_MATCH_STATUS.LASTCALL.name,
    GAME_MATCH_STATUS.CLOSED.name,
    GAME_MATCH_STATUS.WINNERS.name,
  ].includes(gameStatus);

const notLastCall = (gameStatus: string) =>
  [
    GAME_MATCH_STATUS.INITIAL.name,
    GAME_MATCH_STATUS.LASTCALL.name,
    GAME_MATCH_STATUS.CLOSED.name,
    GAME_MATCH_STATUS.WINNERS.name,
  ].includes(gameStatus);

const notClosedCall = (gameStatus: string) =>
  [
    GAME_MATCH_STATUS.INITIAL.name,
    GAME_MATCH_STATUS.OPEN.name,
    GAME_MATCH_STATUS.CLOSED.name,
    GAME_MATCH_STATUS.WINNERS.name,
  ].includes(gameStatus);

const notNewCall = (gameStatus: string) =>
  [
    GAME_MATCH_STATUS.INITIAL.name,
    GAME_MATCH_STATUS.OPEN.name,
    GAME_MATCH_STATUS.LASTCALL.name,
    GAME_MATCH_STATUS.CLOSED.name,
  ].includes(gameStatus);

const notDeclareWinning = (gameStatus: string) =>
  [
    GAME_MATCH_STATUS.INITIAL.name,
    GAME_MATCH_STATUS.OPEN.name,
    GAME_MATCH_STATUS.LASTCALL.name,
    GAME_MATCH_STATUS.WINNERS.name,
  ].includes(gameStatus);

const isOneOfTheGameStatus = (gameStatus: string) =>
  [
    GAME_MATCH_STATUS.INITIAL.name,
    GAME_MATCH_STATUS.CLOSED.name,
    GAME_MATCH_STATUS.LASTCALL.name,
    GAME_MATCH_STATUS.WINNERS.name,
  ].includes(gameStatus);

export {
  notOpen,
  notLastCall,
  notClosedCall,
  notNewCall,
  notDeclareWinning,
  isOneOfTheGameStatus,
};
