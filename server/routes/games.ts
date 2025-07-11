import schema from "../schema/games";
import controllers from "../controller/games";

async function gamesRoutes(fastify) {
  fastify.get("/", {
    schema: schema.getGames,
    handler: controllers.getGames,
  });

  fastify.post("/transactions/callback", {
    handler: controllers.getTransactionsCallback,
  });
}

export default gamesRoutes;
