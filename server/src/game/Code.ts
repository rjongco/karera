export class Input {
	msg: string;
}

export class Output {
	msg;

  insert(name, data) {
    if (hasValue(this.msg)) {
      this.msg[name] = data;
    } else {
      this.msg = {};
      this.msg[name] = data;
    }
  }
}

import { World } from 'uecs';
import { GameState, hasValue } from '../../../common/gameutils';

export class Game extends World {
  running = false;
  private initSystems = [];
  private beforeSystems = [];
  private currentSystems = [];
  private afterSystems = [];

  addPlugin(plugin: Plugin) {
    plugin.build(this);
    return this;
  }
  init(system) {
    this.initSystems.push(system);
    return this;
  }
  before(system) {
    this.beforeSystems.push(system);
    return this;
  }
  system(system) {
    this.currentSystems.push(system);
    return this;
  }
  after(system) {
    this.afterSystems.push(system);
    return this;
  }
  async run() {
    this.running = true;

    this.initSystems.forEach((s) => {
      s(this);
    });

    const fps = 60;
    const interval = 1000 / fps;
    while (this.running) {
      this.beforeSystems.forEach((s) => {
        s(this);
      });
      
      await new Promise(resolve => setTimeout(resolve, interval));
      this.currentSystems.forEach((s) => {
        s(this);
      });
      this.afterSystems.forEach((s) => {
        s(this);
      });
    }
  }
  async loaded() {
    return new Promise<void>(resolve => {
      const interval = setInterval(() => {
        if (this.running) {
          clearInterval(interval);
          resolve();
        }
      }, 1000 / 30);
    });
  }
  stop() {
    this.running = false;
  }
}

export interface Plugin {
  build(game: Game): void;
}

export class GameData {
	prevState: GameState
	state: GameState = GameState.Idle;
	isInsertGameDatabase: false;
  hasGameStateChanged = false;
  gameId: number;
  calculateAllBets = false;
  commission = 0.1;
  slotBets = new Map<string, number>();
  odds = new Map<string, number>();

  winnerOrders = undefined;
  winners = [];

	setState(state) {
		this.prevState = this.state;
		this.state = state;
	}
  getTotalNet(): number {
    let totalNet = 0;
    this.slotBets.forEach((val, key) => {
      totalNet += val;
    });
    return totalNet - (totalNet * this.commission);
  }
}

export class GameStateChanged { }

export class Winner {
  uuid: string;
  prize: number;
  constructor(uuid, prize) {
    this.uuid = uuid;
    this.prize = prize;
  }
}

