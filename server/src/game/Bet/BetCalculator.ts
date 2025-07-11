import { hasValue } from "../../../../common/gameutils";
import { Game, GameData, Plugin } from "../Code";
import { Player } from "../Player";
import { BetDbSuccess } from "../BetDbManager";

export class BetCalculator implements Plugin {
	build(game: Game): void {
		game
			.system(update);
	}
}

function update(game: Game) {
	// Questionnable implementation
	game.view(GameData).each((entity, gameData) => {
		if (gameData.calculateAllBets) {
			gameData.slotBets.clear();
			game.view(Player).each((entity, player) => {
				player.slots.forEach((amount, key) => {
					let val = gameData.slotBets.get(key);
					if (hasValue(val)) {
						val += amount;
					} else {
						val = amount;
					}
					gameData.slotBets.set(key, val);
				})
			});
		}
	});

	// Recalculating if database has been successful
	// Have to change implementation where
	// Nothing should be changed until validated from the database
	game.view(GameData, BetDbSuccess).each((entity, gameData, betDbSuccess) => {
		gameData.slotBets.clear();
		game.view(Player).each((entity, player) => {
			player.slots.forEach((amount, key) => {
				let val = gameData.slotBets.get(key);
				if (hasValue(val)) {
					val += amount;
				} else {
					val = amount;
				}
				gameData.slotBets.set(key, val);
			})
		});
	});
}

/*
	Validate first from database
	They calculate
	Have to check if there is enough balance
 */




