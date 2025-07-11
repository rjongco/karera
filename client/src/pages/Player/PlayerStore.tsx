import { create } from "zustand";
import { getRequiredUrl } from "../../utils/common";
import { ClientCommands, GameState, hasValue } from "../../../../common/gameutils";

enum LocalState {
  Connected = "Connected",
  Disconnected = "Disconnected",
}

export const playerStore = create((set) => ({
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
    connect(set);
  },
  sendMessage: (message) => {
    const { socket } = playerStore.getState();
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
  lastSelectedIndex: -1,
  setLastSelectedIndex: (i) => {
    set({ lastSelectedIndex: i });
  },
  winnerIndex: -1,
  setWinnerIndex: (index) => {
    set({ winnerIndex: index });
  },
  selectedButton: null,
  setSelectedButton: (s) => {
    set({ selectedButton: s });
  },
  isWinner: false,
  setIsWinner: (w) => {
    set({ isWinner: w });
  },
  balance: 0,
  setBalance: (m) => {
    set({ balance: m });
  },
  openModal: false,
  setOpenModal: (o) => {
    set({ openModal: o });
  },
  bet: 0,
  setBet: (b) => {
    set({ bet: b });
  },
  tempSelectedIndex: 0,
  setTempSelectedIndex: (i) => {
    set({ tempSelectedIndex: i });
  },
  odds: new Map<string, number>(),
  setOdds: (b) => {
    set({ odds: b });
  },
  prize: 0,
  setPrize: (s) => {
    set({ prize: s });
  },
  winners: [],
  setWinners: (s) => {
    set({ winners: s });
  },
  showBetting: true,
  setShowBetting: (s) => {
    set({ showBetting: s });
  },
  topPlayers: [],
  setTopPlayers: (s) => {
    set({ topPlayers: s });
  },
  slots: new Map<string, number>(),
  setSlots: (b) => {
    set({ slots: b });
  },
}));

export default function connect(set) {
  const url = getRequiredUrl();
  if (!hasValue(url)) {
    throw `No valid url: ${url}`;
  }
  const socket = new WebSocket(url);

  if (!hasValue(socket)) {
    // TODO: Have to implement redirect to /login
    console.log("No uuid and token");
    return;
  }

  socket.addEventListener("open", () => {
    set({ socket });
    set({ gameState: "Connected, waiting for betting to open" });
    set({ socketState: "open" });
    open(set, socket);

    socket.send(JSON.stringify({
      cmd: ClientCommands.Init
    }));
  });
  socket.addEventListener("message", (event) => {
    update(set, event.data);
  });
  socket.addEventListener("error", (event) => {
    set((state) => ({ output: [...state.output, "Error: " + event.message] }));
  });
  socket.addEventListener("close", () => {
    set((state) => ({ output: [...state.output, "Connection closed"] }));
  });
}


function open(set, socket) {
  set({ socket });
  set({ socketState: "STANDBY" });

  set({ localState: LocalState.Connected });
  set({ gameState: null });

  setTimeout(() => {
    socket.send(
      JSON.stringify({
        cmd: ClientCommands.Init
      })
    );
  }, 100)
}

function update(set, eventData) {
  const meta = JSON.parse(eventData);

  console.log(meta);
  if (hasValue(meta.balance)) {
    set({ balance: meta.balance });
  }

  if (hasValue(meta.odds)) {
    let map = new Map<string, []>(meta.odds);
    set({ odds: map });
  }
  if (hasValue(meta.nets)) {
    let map = new Map<string, []>(meta.nets);
    set({ nets: map });
  }
  if (hasValue(meta.winnerIndex)) {
    set({ winnerIndex: meta.winnerIndex });
  }
  if (hasValue(meta.prize)) {
    set({ prize: meta.prize });
  }
  if (hasValue(meta.state)) {
    set({ gameState: meta.state });
  }
  if (hasValue(meta.winners)) {
    set({ winners: meta.winners });
  }
  if (hasValue(meta.topPlayers)) {
    set({ topPlayers: meta.topPlayers });
  }

  newGameState(set, meta);
}

function newGameState(set, meta) {
  if (meta.state === GameState.NewGame) {
    set({ gross: 0 });
    set({ net: 0 });
    set({ result: [] });
    set({ winner: null });
    set({ winnerIndex: -1 });
    set({ selectedIndex: -1 });
    set({ selectedButton: null });
    set({ bet: 0 });
    set({ odds: new Map<string, number>() });
    set({ nets: new Map<string, number>() });
    set({ prize: 0 });
    set({ slots: new Map<string, number>() });
  }
}

function updateNotOnSchedule(meta, set) {
  if (meta.state === GameState.Idle || meta.state === GameState.NewGame) {
    set({ gross: 0 });
    set({ net: 0 });
    set({ result: [] });
    set({ winner: null });
    set({ winnerIndex: -1 });
    set({ selectedIndex: -1 });
    set({ selectedButton: null });
    set({ bet: 0 });
    set({ odds: new Map<string, number>() });
    set({ nets: new Map<string, number>() });
  }
  
}
