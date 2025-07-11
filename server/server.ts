// const app = require("./app");
import fastify from "./app";
import database from "./config/database";
import stasherAPI from "./api/stasher";
import { DEVELOPMENT, LOCAL } from "./constants";

//Start the Fastify server
const start = async () => {
  const environment = process.env.NODE_ENV || "local";

  try {
    await database.sync({ alter: true });
    if (environment === DEVELOPMENT) {
      //await stasherAPI.initializeStasher(fastify);
      fastify.listen({ port: process.env.PORT }, "0.0.0.0", (err: any) => {
        if (err) {
          console.error("Error starting server:", err);
          process.exit(1); // Exit the process if there's an error starting the server
        }

        console.log(`Server is running on port ${process.env.PORT}`);
      });
    } else if (environment === LOCAL) {
      //await stasherAPI.initializeStasher(fastify);
      await fastify.listen({ port: process.env.PORT }, (err: any) => {
        // dev mode
        if (err) {
          console.error("Error starting server:", err);
          process.exit(1); // Exit the process if there's an error starting the server
        }

        console.log(`Server is running on port ${process.env.PORT}`);
      });
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
