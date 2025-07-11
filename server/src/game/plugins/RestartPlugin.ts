import { GameState } from "../../../../common/gameutils";
import { Odds } from "../Bet/Odds";
import { Game, GameData, Plugin } from "../Code";
import { Player } from "../Player";

export class RestartPlugin implements Plugin {
	build(game: Game): void {
		game
			.system(update);
	}
}

function update(game: Game) {
	game.view(GameData, Odds, Restart)
	.each((entity, gameData, odds, restart) => {
		if (gameData.state === GameState.NewGame) {
			if (!restart.restarted) {
				restart.restarted = true;

				gameData.slotBets.clear();
				gameData.odds.clear();
				gameData.winnerOrders = undefined;
				gameData.winners = [];

				odds.values.clear();

				game.view(Player).each((entity, player) => {
					player.hasBet = false;
					player.slots.clear();
				});
			}
		}

		if (gameData.state === GameState.WinnerDeclared) {
			if (restart.restarted) {
				restart.restarted = false;
			}
		}
	});
}


export class Restart {
	restarted = false;
}

