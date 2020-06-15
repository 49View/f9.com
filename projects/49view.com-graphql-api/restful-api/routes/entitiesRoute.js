import * as metaAssistant from "../assistants/metadataAssistant";
import * as fsController from "../controllers/fsController";
import {furnitureSetModel} from "../../models/furniture_set";

const entityController = require("../controllers/entityController");
const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

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
      req.params.tags
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

router.get("/list/:group/:tags", async (req, res, next) => {
  try {
    logger.info(req.url);
    const group = req.params.group;
    const tags = metaAssistant.splitTags(req.params.tags);
    const project = "49View";//req.user.project;
    //Check existing entity for use project (or public)
    const foundEntities = await entityController.getEntitiesByProjectGroupTags(
      project,
      group,
      tags,
      req.params.tags
    );
    if (foundEntities !== null && foundEntities.length > 0) {
      res.send( foundEntities );
    } else {
      res.sendStatus(204);
    }
  } catch (ex) {
    console.log("ERROR GETTING ENTITY LIST BYGROUPTAGS: ", ex);
    res.status(400).send(ex);
  }
});


module.exports = router;
