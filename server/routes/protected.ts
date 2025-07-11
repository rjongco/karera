import User from "../models/User";
import userRoutes from "./user";
import logsRoutes from "./logs";
import gameRoutes from "./game";
import notificationRoutes from "./notifications";
import addressRoutes from "./address";
import referralsRoutes from "./referrals";
import transactionsRoutes from "./transactions";
import gamesAuthRoutes from "./gamesAuth";

async function protectedRoutes(fastify: any) {
  fastify.decorateRequest("token", null);
  fastify.addHook("onRequest", async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
  fastify.addHook("onRequest", async (request: any, reply: any) => {
    const uuid = request.user.uuid;
    request.token = fastify.jwt.sign({ uuid });
    try {
      const user = await User.findOne({
        where: { uuid },
      });

      const { role, id } = user;
      request.user.id = id;
      request.userRole = role;
    } catch (err) {
      reply.send("You need to be authorize to access this route.");
    }
  });

  userRoutes(fastify);
  logsRoutes(fastify);
  notificationRoutes(fastify);
  addressRoutes(fastify);
  gameRoutes(fastify);
  gamesAuthRoutes(fastify);
  referralsRoutes(fastify);
  transactionsRoutes(fastify);
}

export default protectedRoutes;
