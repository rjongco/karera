import schema from "../schema/referrals";
import controllers from "../controller/referrals";

function userRoutes(fastify) {
  fastify.get("/referrals", {
    schema: schema.getAllReferrals,
    handler: controllers.getAllReferrals,
  });
}

export default userRoutes;
