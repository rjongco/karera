import { GameState } from "../../../../common/gameutils";
import Game from "../../../models/Game";
import { Odds } from "../Bet/Odds";
import { Game as GameWorld, GameData, Plugin } from "../Code";
import { Player } from "../Player";

export class GameDbPlugin implements Plugin {
	build(game: GameWorld): void {
		game
			.system(update);
	}
}

function update(game: GameWorld) {
	game.view(GameData, GameDb)
	.each((entity, gameData, gameDb) => {
		updateDb(gameData);
	});
}

async function updateDb(gameData: GameData) {
	try {
		let gross = 0;
		gameData.slotBets.forEach((val, key) => {
			gross += val;
		})

		// console.log(`gross ${gross}`);
		let g = await Game.findByPk(gameData.gameId);
		g.gross = gross;
		g.save();

		
	} catch (e) {
		console.error(e);
	}
}


export class GameDb { }

