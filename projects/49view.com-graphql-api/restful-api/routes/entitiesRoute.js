import * as metaAssistant from "../assistants/metadataAssistant";
import * as fsController from "../controllers/fsController";
import {writeFileComplete} from "../controllers/fsController";
import {uploadModel} from "../../models/upload";

const entityController = require("../controllers/entityController");
const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

router.get("/color/list", async (req, res, next) => {
  try {
    logger.info(req.url);
    const foundEntities = await entityController.getColorCategories();
    if (foundEntities !== null && foundEntities.length > 0) {
      res.send(foundEntities);
    } else {
      res.sendStatus(204);
    }
  } catch (ex) {
    console.log("ERROR GETTING FAMILY category: ", ex);
    res.status(400).send(ex);
  }
});

router.get("/:group/:tags", async (req, res, next) => {
  try {
    logger.info(req.url);
    const group = req.params.group;
    const mainPath = `entities/${group}`;
    const tags = metaAssistant.splitTagsWithUnion(req.params.tags);
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

router.get("/list/color/:category", async (req, res, next) => {
  try {
    logger.info(req.url);
    const category = req.params.category;
    let foundEntities = await entityController.getColorsInCategory(category);
    if (foundEntities !== null && foundEntities.length > 0) {
      const fixedEntities = foundEntities.map( e => {
        let newElement = e.toObject();
        newElement.hash = newElement._hash;
        return newElement;
      });
      res.send(fixedEntities);
    } else {
      res.sendStatus(204);
    }
  } catch (ex) {
    console.log("ERROR GETTING FAMILY category: ", ex);
    res.status(400).send(ex);
  }
});

router.get("/list/:group/:tags", async (req, res, next) => {
  try {
    logger.info(req.url);
    const group = req.params.group;
    const tags = metaAssistant.splitTagsWithUnion(req.params.tags);
    const project = "49View";//req.user.project;
    //Check existing entity for use project (or public)
    const foundEntities = await entityController.getEntitiesByProjectGroupTags(
      project,
      group,
      tags,
      req.params.tags
    );
    if (foundEntities !== null && foundEntities.length > 0) {
      res.send(foundEntities);
    } else {
      res.sendStatus(204);
    }
  } catch (ex) {
    console.log("ERROR GETTING ENTITY LIST BYGROUPTAGS: ", ex);
    res.status(400).send(ex);
  }
});

module.exports = router;
