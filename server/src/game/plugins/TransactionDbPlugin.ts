import { GameState } from "../../../../common/gameutils";
import Game from "../../../models/Game";
import Transaction from "../../../models/Transaction";
import Wallet from "../../../models/Wallet";
import { Odds } from "../Bet/Odds";
import { Prize } from "../Bet/Prize";
import { Game as GameWorld, GameData, Plugin } from "../Code";
import { Player } from "../Player";
import { UserData } from "../UserData";
import { GameDb } from "./GameDbPlugin";

export class TransactionDbPlugin implements Plugin {
	build(game: GameWorld): void {
		game
			.system(update);
	}
}

function update(game: GameWorld) {
	game.view(GameData, GameDb)
	.each((entity, gameData, gameDb) => {
		
		game.view(UserData, TransactionDb, Prize)
		.each((entity, userData, transactionDb, prize) => {
			updateDb(gameData, userData, prize);
		});

	});
}

function updateDb(gameData: GameData, userData: UserData, prize: Prize) {
	prize.values.forEach((val, key) => {
		if (gameData.winnerOrders[0] == key && val > 0) {
			const update = async() => {
				try {
					const wallet = await Wallet.findByUserId(userData.data.id);
					let t = await Transaction.new(wallet.id, gameData.gameId, val, "wonprize");
				} catch (e) {
					console.error(e);
				}
			}
			update();
		}
	});
}


export class TransactionDb { }

