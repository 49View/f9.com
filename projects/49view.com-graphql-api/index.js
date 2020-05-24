import dbi from "eh_db";

import * as authController from "eh_auth_and_auth/controllers/authController";
import {initApollo} from "./apolloServer";
import {app, initServer, runServer} from "./httpserver";
import {runWebsocketServer} from "./websocketServer";

const usersRoute        = require("eh_auth_and_auth/routes/usersRoute");
const tokenRoute        = require("eh_auth_and_auth/routes/tokenRoute");
const stripeRoute       = require("./restful-api/routes/stripeRoute");
const shadersRoute      = require("./restful-api/routes/shadersRoute");
const fsRoute           = require("./restful-api/routes/fsRoute");
const entitiesRoute     = require("./restful-api/routes/entitiesRoute");
const furnitureSetRoute = require("./restful-api/routes/furnitureSetRoute");
const propertyRoute     = require("./restful-api/routes/propertyRoute");
const propertyBimRoute  = require("./restful-api/routes/propertyBimRoute");

const init = () => {
  dbi.initDB().then();
  initServer();
  authController.initializeAuthentication();
  initApollo();
};

const use = () => {
  app.use("/", tokenRoute);
  app.use("/user", usersRoute);
  app.use("/stripe", stripeRoute);
  app.use("/shaders", shadersRoute);
  app.use("/entities", entitiesRoute);
  app.use("/furnitureset", furnitureSetRoute);
  app.use("/propertyBim", propertyBimRoute);
  app.use(authController.authenticate);
  app.use("/fs", fsRoute);
  app.use("/property", propertyRoute);
};

init();
use();
runServer();
runWebsocketServer();
