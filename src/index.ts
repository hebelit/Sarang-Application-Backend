import "reflect-metadata";
import { DataSource } from "typeorm";
// import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
// import { authChecker } from "./utils/auth";
import {Task} from "./entities/task";
import {TaskResolver} from "./resolver/task";
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 8000;
const corsOrigin = [
  "http://localhost:8000",
  "http://localhost:3000",
];
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [TaskResolver],
    validate: { forbidUnknownValues: false },
  });
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  console.log(process.env.PASSWORD)
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: corsOrigin,
      credentials: true,
    }),
    json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 8000 }, resolve)
  );
  console.log(`Server ready at http://localhost:8000/graphql`);
}
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
//   console.log("server is running", url);
// }
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "asd",
  database: "task" ,
  synchronize: true,
  logging: false,
  entities: [Task],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
    bootstrap();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
