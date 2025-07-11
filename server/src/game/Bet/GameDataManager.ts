import { Game, GameData, Plugin } from "../Code";

export class GameDataManager implements Plugin {
	build(game: Game): void {
		game
			.before(before)
	}
}

function before(game: Game) {
	game.view(GameData).each((entity, gameData) => {
		if (gameData.calculateAllBets) {
			gameData.calculateAllBets = false;
			// console.log("false")
		}
	});
	
}
