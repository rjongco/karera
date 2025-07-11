import schema from "../schema/transactions";
import controllers from "../controller/transactions";

function transactionsRoutes(fastify) {
  fastify.get("/transactions", {
    schema: schema.getAllTransactions,
    handler: controllers.getAllTransactions,
  });
}

export default transactionsRoutes;
