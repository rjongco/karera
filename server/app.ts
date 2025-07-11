import fastifyCors from "@fastify/cors";
import authRoutes from "./routes/auth";
import gamesRoutes from "./routes/games";
import protectedRoutes from "./routes/protected";
import protectedSocket from "./sockets/protected";
import { options } from "./config/swagger-config";
import { Main } from "./src/main";
import { DEVELOPMENT } from "./constants";
const environment = process.env.NODE_ENV || "local";

const fastifySession = require("@fastify/session");
const fastifyCookie = require("@fastify/cookie");
const path = require("node:path");
const fastifyJwt = require("@fastify/jwt");
const fastifyAuth = require("@fastify/auth");
const fastifyUserAgent = require("fastify-user-agent");
const fastify = require("fastify")({
  logger: true,
});

fastify.register(fastifyCookie);
fastify.register(fastifySession, { secret: process.env.SECRET_SESSION_KEY });
fastify.register(fastifyUserAgent);
fastify.register(fastifyJwt, { secret: process.env.SECRET_KEY });
fastify.register(fastifyAuth);
fastify.register(require("@fastify/swagger"), {});
fastify.register(require("@fastify/swagger-ui"), options);
const multipart = require("@fastify/multipart");
fastify.register(multipart);

fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.addHook("onRequest", async (request) => {
  request.session.ipAddress = request.ip;
  request.session.userAgent = request.userAgent;
});

let prefix = "/api/v1"; // For local
if (process.env.DEV_MODE === "dev") {
  prefix = "/v1";
}

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public/uploads/images"),
  prefix: `${prefix}/admin/images`, // dev mode
  // prefix: "/v1/admin/images", // prod mode
  // constraints: { host: "localhost:8001" }, // optional: default {}
});

fastify.register(authRoutes, {
  // prefix: "/v1", // prod mode
  prefix: `${prefix}`, // dev mode
});

fastify.register(gamesRoutes, {
  // prefix: "/v1/games", // prod mode
  prefix: `${prefix}/games`, // dev mode
});

fastify.register(protectedRoutes, {
  // prefix: "/v1/admin", // prod mode
  prefix: `${prefix}/admin`, // dev mode
});

fastify.get(`${prefix}/test`, (req, res) => {
  res.send("test");
});

// DO NOT DELETE THIS
// fastify.register(require("@fastify/websocket"), {
//   options: { maxPayload: 1048576 },
// });
//fastify.register(protectedSocket);

// FIXME: Have a way to disable when it is in production mode
fastify.get(`${prefix}/restart`, (req, res) => {
  res.send("Restart Game Successful");
  Main.getInstance().restart();
  console.log("Restart Game");
});

export default fastify;
