import {apolloServerInstance} from "./apolloServer";
import {uploadModel} from "./models/upload";
import {thumbnailMakerModel} from "./models/thumbnail_maker";
import {sendToOneUser} from "./websocketServer";
import {daemonCrashModel} from "./models/daemon_crash";
import {completedUploadModel} from "./models/completed_upload";

const globalConfig = require("eh_config");
const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const usersModel = require("eh_auth_and_auth/models/user");

const PORT = 4500;
export let app = null;
export let httpServer = null;

export const initServer = () => {
  app = express();
  httpServer = http.createServer(app);

  app.use(bodyParser.raw({limit: "500mb", type: 'application/octet-stream'}));
  app.use(bodyParser.text({limit: "500mb"}));
  app.use(bodyParser.json({limit: "100mb"}));
  app.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
  app.use(cookieParser(globalConfig.mJWTSecret));

  // Listens to following stream changes in mongodb
  uploadModel.watch().on('change', async data => {
    console.log("Uploads have changes", data);
    const updateDoc = await uploadModel.findById(data.documentKey._id);
    const user = await usersModel.findById(updateDoc.toObject().userId);
    sendToOneUser( user.toObject().name, JSON.stringify({
      type: "watchmessage",
      data
    }));
  });
  completedUploadModel.watch().on('change', async data => {
    console.log("Completed uplaods have changes", data);
    const updateDoc = await completedUploadModel.findById(data.documentKey._id);
    const user = await usersModel.findById(updateDoc.toObject().userId);
    sendToOneUser( user.toObject().name, JSON.stringify({
      type: "watchmessage",
      data
    }));
  });
  thumbnailMakerModel.watch().on('change', async data => {
    console.log("Thumbnail have been created", data);
    const updateDoc = await thumbnailMakerModel.findById(data.documentKey._id);
    const updateDocO = updateDoc.toObject();
    const user = await usersModel.findById(updateDocO.updatedBy ? updateDocO.updatedBy : updateDocO.userId);
    console.log("thumbnail updated by: ", user.toObject().name );
    sendToOneUser( user.toObject().name, JSON.stringify({
      type: "watchmessage",
      data
    }));
  });
  daemonCrashModel.watch().on('change', data => {
    console.log("Daemon crash", data);
    sendToOneUser(data.fullDocument.username, JSON.stringify({
      type: "watchmessage",
      data
    }));
  });

}

export const runServer = () => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServerInstance.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServerInstance.subscriptionsPath}`)
  });
}
