import { openMatch, getMatch } from "./controllers";

async function gamesSocket(fastify) {
  fastify.get(
    "/*",
    { websocket: true },
    (socket /* WebSocket */, req /* FastifyRequest */) => {
      const actions = req.query?.actions;
      socket.on("message", async (message) => {
        if (actions === "openMatch") {
          openMatch(fastify, req, message);
        } else if (actions === "getMatch") {
          getMatch(fastify, req, message);
        } else if (actions === "getMatchBets") {
          getMatch(fastify, req, message);
        }
      });
    }
  );
}

export default gamesSocket;
