import { ClientCommands, GameState, arrayToMap, hasValue } from "../../../common/gameutils";
import { Bet } from "./Bet";
import { Prize } from "./Bet/Prize";
import { Game, GameData, GameStateChanged, Input, Output, Plugin } from "./Code";
import { Player } from "./Player";
import { UserData } from "./UserData";


export class PlayerManager implements Plugin {
	build(game: Game): void {
		game
			.before(before)
			.system(this.update)
			.system(broadcastWinners);
	}

	update(game: Game) {
		let gameData: GameData;
		game.view(GameData).each((entity, g) => {
			gameData = g;
		});

		game.view(GameStateChanged, Output).each((entity, stateChanged, output) => {
			output.insert("state", gameData.state);
		});

		game.view(Player, Input, Output).each((entity, player, input, output) => {
			if (input.msg !== undefined) {
				requestInit(gameData, input.msg, output);
				onBettingState(game, entity, gameData, player, input.msg);
			}
		});
	}
}

function broadcastWinners(game: Game) {
	let gameData: GameData;
	game.view(GameData).each((entity, g) => {
		gameData = g;
	});

	game.view(GameStateChanged, UserData, Player, Prize, Output)
	.each((entity, stateChanged, userData, player, prize, output) => {
		if (gameData.state === GameState.WinnerDeclared) {
			const winner = gameData.winnerOrders[0];
			player.slots.forEach((val, key) => {
				if (winner === key) {
					// console.log(`winner1 ${winner}`);
					const p = prize.values.get(key);
					gameData.winners.push({
						name: userData.data.nickName,
						prize: p
					});

					output.insert("prize", p);
				}
			});
		}
	});

	if (gameData.winners.length > 0) {
		gameData.winners.sort((a, b) => b.prize - a.prize);
	}

	game.view(GameStateChanged, Output)
	.each((entity, stateChanged, output) => {
		if (gameData.state === GameState.WinnerDeclared) {
			const topPlayers = gameData.winners.slice(0, 3);
			output.insert("topPlayers", topPlayers);
			console.log(topPlayers)
		}
	});
}

function before(game: Game) {
	game.view(Bet).each((entity, bet) => {
		game.remove(entity, Bet);
	});
}

function requestInit(gameData, msg, output) {
	if (hasValue(msg.cmd) && 
	msg.cmd === ClientCommands.Init) {
		output.msg = JSON.stringify({
			state: gameData.state,
		});
	}
}

function onBettingState(game: Game, entity, gameData: GameData, player: Player, msg) {
	if (gameData.state === GameState.Open ||
	gameData.state === GameState.LastCall) {
		const slots = arrayToMap(msg.slots);

		if (hasValue(slots) && slots.size > 0 && hasKeys(player.slots, slots)) {
			player.slots = appendMaps(player.slots, slots);

			game.insert(entity, new Bet);	// Needed for flagging to process individual bet
			gameData.calculateAllBets = true;	// Has to be changed later
		}
	}
	
}

function hasKeys<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
	for (let key of map1.keys()) {
		if (!map2.has(key)) {
			return false;
		}
	}
	return true;
}

function appendMaps<K, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
	let appendedMap = new Map<K, V>(map1);
	for (let [key, value] of map2.entries()) {
		appendedMap.set(key, value);
	}
	return appendedMap;
}
