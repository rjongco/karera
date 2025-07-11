import { GameState, ModeratorCommands, hasValue } from "../../../common/gameutils";
import { Game, GameData, GameStateChanged, Input as InputMsg, Output, Plugin } from "./Code";
import { Moderator } from "./Moderator";
import { GameDb } from "./plugins/GameDbPlugin";

export class ModeratorManager implements Plugin {

	build(game: Game): void {
		game
			.system(this.update);
	}

	update(game) {
		game.view(GameDb).each((entity, gameDb) => {
			game.remove(entity, GameDb);
		})

		let gameData: GameData;
		let gameDataEntity;
		game.view(GameData).each((entity, g) => {
			gameData = g;
			gameDataEntity = entity;
		});

		// console.log(gameData)

		let curState = gameData.state;
		game.view(Moderator, InputMsg, Output).each((entity, mod, input, output) => {
			game.view(GameStateChanged).each((entity, state) => {
				game.remove(entity, GameStateChanged);
			});

			if (input.msg !== undefined) {
				// console.log(`input.msg ${input.msg}`)

				requestInit(gameData, input.msg, output);
				requestIdle(gameData, input.msg, output);
				requestNewGame(gameData, input.msg, output);
				requestOpen(gameData, input.msg, output);
				requestLastCall(gameData, input.msg, output);
				requestClosed(gameData, input.msg, output);
				requestWinnerDeclared(game, gameDataEntity, gameData, input.msg, output);
			}
		});

		if (curState !== gameData.state) {
			game.view(Output).each((entity, output) => {
				game.emplace(entity, new GameStateChanged);
			});
		}
	}
}

function requestInit(gameData, msg, output) {
	if (hasValue(msg.cmd) && 
	msg.cmd === ModeratorCommands.Init) {
		output.msg = {
			state: gameData.state,
		};
	}
}
function requestIdle(gameData, msg, output) {
	if (gameData.state === GameState.WinnerDeclared &&
	hasValue(msg.cmd) && 
	msg.cmd === GameState.Idle) {
		gameData.setState(msg.cmd)
		output.msg = {
			state: gameData.state,
		};
	}
}
function requestNewGame(gameData, msg, output) {
	const winnerDeclaredOrIdle = gameData.state === GameState.WinnerDeclared || gameData.state === GameState.Idle

	if (winnerDeclaredOrIdle &&
	hasValue(msg.cmd) && 
	msg.cmd === GameState.NewGame) {
		gameData.setState(msg.cmd)
		output.msg = {
			state: gameData.state,
		}
	}
}
function requestOpen(gameData, msg, output) {
	const idleOrNewGame = gameData.state === GameState.Idle || gameData.state === GameState.NewGame;
	if (idleOrNewGame &&
	hasValue(msg.cmd) && 
	msg.cmd === GameState.Open) {
		gameData.setState(msg.cmd)
		output.msg = {
			state: gameData.state,
		};

		gameData.isInsertGameDatabase = true;
	}
}
function requestLastCall(gameData, msg, output) {
	if (gameData.state === GameState.Open &&
	hasValue(msg.cmd) && 
	msg.cmd === GameState.LastCall) {
		gameData.setState(msg.cmd)
		output.msg = {
			state: gameData.state,
		};
	}
}
function requestClosed(gameData, msg, output) {
	if (gameData.state === GameState.LastCall &&
	hasValue(msg.cmd) && 
	msg.cmd === GameState.Closed) {
		gameData.setState(msg.cmd)
		output.msg = {
			state: gameData.state,
		};
	}
}
function requestWinnerDeclared(game, gameDataEntity, gameData, msg, output) {
	if (gameData.state === GameState.Closed &&
	hasValue(msg.cmd) && 
	msg.cmd === GameState.WinnerDeclared) {
		gameData.setState(msg.cmd);
		gameData.winnerOrders = msg.winnerOrders;
		output.msg = {
			state: gameData.state,
		};

		game.emplace(gameDataEntity, new GameDb);
	}
}


