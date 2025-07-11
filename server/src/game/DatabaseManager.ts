import { GameState, hasValue } from "../../../common/gameutils";
import Config from "../../models/Config";
import Game from "../../models/Game";
import User from "../../models/User";
import { Game as GameWorld, GameData, Input, Output, Plugin } from "./Code";
import { Moderator } from "./Moderator";
import { UserData } from "./UserData";

export class DatabaseManager implements Plugin {
	build(game: GameWorld): void {
		game
			.system(insertGameData);
	}
}

function updateUserData(game) {
	game.view(UserData).each((entity, userData) => {
		if (!userData.isInitialized) {
			userData.isInitialized = true;
			initUserData(userData);
		}
	});
}

function insertGameData(game) {
	game.view(UserData, Moderator).each((entity, userData) => {
		game.view(GameData).each((entity, gameData) => {
			if (gameData.isInsertGameDatabase) {
				gameData.isInsertGameDatabase = false;
				insertGame(gameData, userData.data.id);
			}
		});
	});
}

function insertGame(gameData: GameData, userId) {
	Config.findOne().then(config => {

		Game.new(userId, config.id, "Zodiac").then(res => {
			console.log("Game created")
			gameData.gameId = res.id;
		}).catch(error => {
			console.log(error)
		});

	}).catch(error => {
		console.log(error)
	})
	
}

function initUserData(userData) {
	User.findByUUID(userData.data.uuid)
		.then(result => {
			// userData.id = result.id;
			userData.data = result;
			// console.log(result.role)
		}).catch(error => {
			console.log(error)
		})
}

/*
	Issue a async function
	Need a feedback loop
		Issue the database change
		Then have a listener after processing
*/