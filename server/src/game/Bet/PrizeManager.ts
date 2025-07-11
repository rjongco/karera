import { mapToArray } from "../../../../common/gameutils";
import { Game, GameData, Output, Plugin } from "../Code";
import { Player } from "../Player";
import { Odds } from "./Odds";
import { Prize } from "./Prize";

export class PrizeManager implements Plugin {
	build(game: Game): void {
		game
			.system(update)
	}
}

function update(game: Game) {
	let gameData: GameData;
	game.view(GameData).each((entity, g) => {
		gameData = g;
	});

	game.view(Player, Prize, Output).each((entity, player, prize, output) => {
		if (gameData.calculateAllBets) {
			player.slots.forEach((amount, key) => {
				const slotGross = gameData.slotBets.get(key);
				const ratio = amount / slotGross;

				const totalNet = gameData.getTotalNet();
				prize.values.set(key, totalNet * ratio);
				output.insert("prizes", mapToArray(prize.values));
			});
		}
	});
}

