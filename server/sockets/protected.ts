import gamesSocket from "./games";
import User from "../models/User";

async function protectedSocket(fastify: any) {
  fastify.addHook("preValidation", async (request, reply) => {
    const token = request.query?.token;
    const decodedToken = fastify.jwt.verify(token);
    const { uuid } = decodedToken;
    try {
      const user = await User.findOne({
        where: { uuid },
      });

      const { role, id } = user;
      // Initialize request.user if it doesn't exist
      if (!request.user) {
        request.user = {};
      }

      // Set request.user.id
      request.user.id = id;

      // Set request.userRole
      request.userRole = role;
    } catch (err) {
      await reply.code(401).send("not authenticated");
    }
  });

  gamesSocket(fastify);
}

export default protectedSocket;
