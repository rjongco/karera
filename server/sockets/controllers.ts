import GameList from "../models/GameList";
import GameMatch from "../models/GameMatch";
import GameMatchBettor from "../models/GameMatchBettor";
import { ERROR, SUCCESS } from "../constants/validation";

const openMatch = async (fastify, req, message) => {
  const game = req.query?.game;
  const matchId = req.query?.matchId;
  const matchStatus = req.query?.matchStatus;
  const userId = req.user.id;
  const messageString = message.toString();

  try {
    const gameModel = await GameList.findOne({
      attributes: ["id", "name"],
      where: { name: game },
      include: [
        {
          model: GameMatch,
        },
      ],
    });

    const isGameMatchModel = gameModel.get("GameMatch");

    if (!isGameMatchModel) {
      const { id } = gameModel;
      const newGameMatchModel = await GameMatch.create({
        gameId: id,
        status: matchStatus,
      });

      if (newGameMatchModel) {
        await GameMatchBettor.create({
          matchId: newGameMatchModel.id,
          userId,
        });
      }

      const payloads = {
        ...newGameMatchModel.dataValues,
        gameWinners: "",
      };

      const payload = {
        status: "success",
        data: JSON.stringify(payloads),
        message: "Game match successfully open!",
      };

      fastify.websocketServer.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(JSON.stringify(payload));
        }
      });
    } else {
      await GameMatch.update(
        { status: matchStatus },
        {
          where: { id: matchId },
        }
      );

      const gameMatchModel = await GameMatch.findOne({
        attributes: ["id", "status"],
        order: [["id", "DESC"]],
        where: { id: matchId },
      });

      const payloads = {
        ...gameMatchModel.dataValues,
        gameWinners: matchStatus === "winners" ? messageString : "",
      };

      const payload = {
        status: "success",
        data: JSON.stringify(payloads),
        message: "Game match successfully open!",
      };

      fastify.websocketServer.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(JSON.stringify(payload));
        }
      });
    }
  } catch (err) {
    const payload = {
      status: ERROR,
      message: err.message,
    };

    fastify.websocketServer.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(payload));
      }
    });
  }
};

const getMatch = async (fastify, req, message) => {
  const game = req.query?.game;
  const userId = req.user.id;

  try {
    const gameMatchModel = await GameMatch.findOne({
      attributes: ["id", "status"],
      include: [
        {
          model: GameList,
          attributes: ["id", "name"],
          where: { name: game },
        },
      ],
    });

    const gameMatchBettorModel = await GameMatchBettor.findOne({
      attributes: ["id"],
      where: { matchId: gameMatchModel.id, userId },
    });

    if (gameMatchBettorModel === null) {
      await GameMatchBettor.create({
        matchId: gameMatchModel.id,
        userId,
      });
    }

    const payloads = {
      ...gameMatchModel.dataValues,
      gameWinners: "",
    };

    const payload = {
      status: "success",
      data: JSON.stringify(payloads),
      message: "Game match successfully fetch!",
    };
    fastify.websocketServer.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(payload));
      }
    });
  } catch (err) {
    const payload = {
      status: ERROR,
      message: err.message,
    };
    fastify.websocketServer.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(payload));
      }
    });
  }
};

const getMatchBets = async (fastify, req, message) => {
  const game = req.query?.game;
  const matchId = req.query?.matchId;
  const matchStatus = req.query?.matchStatus;
  const userId = req.user.id;

  const messageString = message.toString();

  console.log(messageString);

  try {
    const gameModel = await GameList.findOne({
      attributes: ["id", "name"],
      where: { name: game },
      include: [
        {
          model: GameMatch,
        },
      ],
    });

    const isGameMatchModel = gameModel.get("GameMatch");

    if (!isGameMatchModel) {
      const { id } = gameModel;
      const newGameMatchModel = await GameMatch.create({
        gameId: id,
        status: matchStatus,
      });

      if (newGameMatchModel) {
        await GameMatchBettor.create({
          matchId: newGameMatchModel.id,
          userId,
        });
      }

      const payloads = {
        ...newGameMatchModel.dataValues,
        gameWinners: "",
      };

      const payload = {
        status: "success",
        data: JSON.stringify(payloads),
        message: "Game match successfully open!",
      };

      fastify.websocketServer.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(JSON.stringify(payload));
        }
      });
    } else {
      await GameMatch.update(
        { status: matchStatus },
        {
          where: { id: matchId },
        }
      );

      const gameMatchModel = await GameMatch.findOne({
        attributes: ["id", "status"],
        order: [["id", "DESC"]],
        where: { id: matchId },
      });

      const payloads = {
        ...gameMatchModel.dataValues,
        gameWinners: matchStatus === "winners" ? messageString : "",
      };

      const payload = {
        status: "success",
        data: JSON.stringify(payloads),
        message: "Game match successfully open!",
      };

      fastify.websocketServer.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(JSON.stringify(payload));
        }
      });
    }
  } catch (err) {
    const payload = {
      status: ERROR,
      message: err.message,
    };

    fastify.websocketServer.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(payload));
      }
    });
  }
};

export { openMatch, getMatch, getMatchBets };
