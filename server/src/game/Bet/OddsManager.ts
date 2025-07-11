import { hasValue, mapToArray } from "../../../../common/gameutils";
import { Game, GameData, Output, Plugin } from "../Code";
import { Odds } from "./Odds";

export class OddsManager implements Plugin {
	build(game: Game): void {
		game
			.system(update)
	}
}

function update(game: Game) {
	let g;
	let o;
	game.view(GameData, Odds).each((entity, gameData, odds) => {
		g = gameData;
		o = odds;
		if (gameData.calculateAllBets) {
			let totalNet = gameData.getTotalNet();
			
			gameData.slotBets.forEach((val, key) => {
				odds.values.set(key, totalNet / val);
			});
		}
	});

	if (g.calculateAllBets) {
		game.view(Output).each((entity, output) => {
			if (hasValue(output.msg)) {
				output.msg.odds = mapToArray(o.values);
			} else {
				output.msg = {};
				output.msg.odds = mapToArray(o.values);
			}
		});
	}
	
}