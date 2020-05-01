import * as metaAssistant from "../assistants/metadataAssistant";
import * as fsController from "../controllers/fsController";
import {writeFileComplete} from "../controllers/fsController";

const entityController = require("../controllers/entityController");
const express = require("express");
const router = express.Router();
const tar = require("tar-stream");
const streams = require("memory-streams");
const logger = require('eh_logger');
const db = require("eh_db");

router.get("/:group/:tags", async (req, res, next) => {
  try {
    logger.info(req.url);
    const group = req.params.group;
    const mainPath = `entities/${group}`;
    const tags = metaAssistant.splitTags(req.params.tags);
    const project = "49View";//req.user.project;
    //Check existing entity for use project (or public)
    const foundEntities = await entityController.getEntitiesByProjectGroupTags(
      project,
      group,
      tags,
      req.params.tags,
      true,
      null
    );
    if (foundEntities !== null && foundEntities.length > 0) {
      let entity = foundEntities[0];
      fsController.writeResFile(res, entity, fsController.readFile(mainPath, entity.hash));
    } else {
      res.sendStatus(204);
    }
  } catch (ex) {
    console.log("ERROR GETTING ENTITY CONTENT BYGROUPTAGS: ", ex);
    res.status(400).send(ex);
  }
});

router.post(
  "/:filename/:filenameFSID/:project/:group/:username/:useremail",
  async (req, res, next) => {
    try {
      logger.info("Post from daemon...");

      const entity = await entityController.createEntity(
        req.params.filenameFSID,
        req.params.filename,
        decodeURIComponent(req.params.project),
        req.params.group,
        decodeURIComponent(req.params.username),
        decodeURIComponent(req.params.useremail)
      );

      if (entity !== null) {
        res
          .status(201)
          .json(entity)
          .end();
      } else {
        throw "[post.entity] Entity created is null";
      }
    } catch (ex) {
      console.log("[POST] Entity error: ", ex);
      res.sendStatus(400);
    }
  }
);

// // Data is going to be in body
// router.post(
//   "/:filename/:group",
//   async (req, res, next) => {
//     try {
//       logger.info("Post from daemon...");
//
//       db.fsUpsert( db.bucketEntities, req.params.filename, req.body, )
//       const entity = await entityController.createEntity(
//         req.params.filenameFSID,
//         req.params.filename,
//         decodeURIComponent(req.params.project),
//         req.params.group,
//         decodeURIComponent(req.params.username),
//         decodeURIComponent(req.params.useremail)
//       );
//
//       if (entity !== null) {
//         res
//           .status(201)
//           .json(entity)
//           .end();
//       } else {
//         throw "[post.entity] Entity created is null";
//       }
//     } catch (ex) {
//       console.log("[POST] Entity error: ", ex);
//       res.sendStatus(400);
//     }
//   }
// );

module.exports = router;
