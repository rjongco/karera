import schema from "../schema/games";
import controllers from "../controller/games";

async function gamesAuthRoutes(fastify) {
  fastify.post("/game/match/open", {
    schema: schema.openGameMatch,
    handler: controllers.openGameMatch,
  });

  fastify.get("/game/match", {
    schema: schema.gameMatch,
    handler: controllers.gameMatch,
  });

  fastify.post("/game/deposit", {
    schema: schema.addGameDeposit,
    handler: controllers.addGameDeposit,
  });

  fastify.post("/game/withdraw", {
    schema: schema.addGameWithdraw,
    handler: controllers.addGameWithdraw,
  });

  fastify.get("/game/transactions", {
    schema: schema.getGameTransactions,
    handler: controllers.getGameTransactions,
  });
}

export default gamesAuthRoutes;
