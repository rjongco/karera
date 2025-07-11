import { create } from "zustand";
import { getRequiredUrl } from "../../utils/common";
import { GameState, ModeratorCommands, hasValue } from "../../../../common/gameutils";


enum LocalState {
  Connected = "Connected",
  Disconnected = "Disconnected",
}

export enum UIRightFloatingState {
  Default = "Default",
  ShowGameStatus = "ShowGameStatus",
  ShowWinnersSelection = "ShowWinnersSelection",
}

const moderatorStore = create((set) => ({
  uiState: UIRightFloatingState.Default,
  setUIState: (s) => {
    set({ uiState: s });
  },
  socket: null,
  output: [],
  localState: LocalState.Disconnected,
  setLocalState: (s) => {
    set({ localState: s });
  },
  gameState: null,
  setGameState: (g) => {
    set({ gameState: g });
  },
  socketState: "",
  connect: () => {
    const url = getRequiredUrl();
    if (!hasValue(url)) {
      throw `No valid url: ${url}`;
    }
    const socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      open(set, socket);
    });
    socket.addEventListener("message", (event) => {
      update(set, event.data);
    });
    socket.addEventListener("error", (event) => {
      set({ socketState: "error" });
      set((state) => ({
        output: [...state.output, "Error: " + event.message],
      }));
    });
    socket.addEventListener("close", () => {
      set({ socketState: "close" });
      set((state) => ({ output: [...state.output, "Connection closed"] }));
    });
  },
  sendMessage: (message) => {
    const { socket } = moderatorStore.getState();
    if (socket) {
      socket.send(message);
      set((state) => ({
        output: [...state.output, "Sent message: " + message],
      }));
    }
  },

  selectedIndex: -1,
  setSelectedIndex: (index) => {
    set({ selectedIndex: index });
  },
  winner: -1,
  setWinner: (index) => {
    set({ winner: index });
  },
  selectedButton: null,
  setSelectedButton: (s) => {
    set({ selectedButton: s });
  },

  totalBets: 0,
  setTotalBets: (total) => { set( {totalBets: total})},
  odds: new Map<string, number>(),
  setOdds: (b) => {
    set({ odds: b });
  },

  gross: 0,
  setGross: (g) => {
    set({ gross: g });
  },
  net: 0,
  setNet: (g) => {
    set({ net: g });
  },
  result: [],
  setResult: (r) => {
    set({ result: r });
  },
}));

export default moderatorStore;

function open(set, socket) {
  set({ socket });
  set({ socketState: "open" });

  setTimeout(() => {
    socket.send(
      JSON.stringify({
        cmd: ModeratorCommands.Init
      })
    );
  }, 100)
  
}

function update(set, eventData) {
  const meta = JSON.parse(eventData);
  console.log(meta);

  if (hasValue(meta.winnerIndex)) {
    set({ winner: meta.winnerIndex });
  }
  if (hasValue(meta.odds)) {
    const odds = new Map<string, []>(meta.odds);
    console.log(odds);
    set({ odds: odds });
  }
  if (hasValue(meta.gross)) {
    set({ gross: meta.gross });
  }
  if (hasValue(meta.net)) {
    set({ net: meta.net });
  }
  if (hasValue(meta.state)) {
    set({ gameState: meta.state });
  }

  updateNotOnSchedule(meta, set);
}

function updateNotOnSchedule(meta, set) {
  if (meta.state != GameState.Idle) {
    return;
  }
  set({ gross: 0 });
  set({ net: 0 });
  set({ result: [] });
  set({ winner: null });
}


