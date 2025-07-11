import { ZODIAC_LABELS, hasValue } from "../../../common/gameutils";
import Bet from "../../models/Bet";
import Transaction from "../../models/Transaction";
import Wallet from "../../models/Wallet";
import { Bet as BetData } from "./Bet";
import { Game, GameData, Input, Output, Plugin } from "./Code";
import { Player } from "./Player";
import { UserData } from "./UserData";


export class BetDbManager implements Plugin {
	build(game: Game): void {
		game
			.system(update);
	}
}

function update(game: Game) {
	let gameData: GameData;
	let gameEntity;
	game.view(GameData).each((entity, g) => {
		gameEntity = entity;
		gameData = g;
	});

	game.view(BetData, UserData, Player, Output).each((entity, bet, userData, player, output) => {
		game.remove(gameEntity, BetDbSuccess);
		processBet();

		async function processBet() {
			const userId = userData.data.id;
			let amount = 0;
			let index = "";
			player.slots.forEach((val, key) => {
				amount = val;
				index = key;
			});
			
			let w = await Wallet.findByUserId(userId);
			if (w === undefined) {
				console.error("Wallet doesn't exist for user " + userId);
			}

			const newBal = w.balance - amount;
			if (!isNaN(newBal) && hasValue(newBal) && newBal > 0) {
				const gameId = gameData.gameId;

				const wallet = await Wallet.updateBalance(userId, -amount, "bet");
				const transaction = await Transaction.new(wallet.id, gameId, amount, "bet");
				await Bet.new(gameId, transaction.id, ZODIAC_LABELS[parseInt(index)]);

				output.msg = JSON.stringify({
					balance: wallet.balance
				})

				game.emplace(gameEntity, new BetDbSuccess);
			} else {
				output.msg = JSON.stringify({
					bet: false,
					error: `Insufficient funds ${w.balance}`
				})
			}
			
		}
	});
}

export class BetDbSuccess { }

