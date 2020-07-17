import * as metaAssistant from "../assistants/metadataAssistant";
import * as fsController from "../controllers/fsController";
import {writeFileComplete} from "../controllers/fsController";
import {uploadModel} from "../../models/upload";

const entityController = require("../controllers/entityController");
const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

router.post("/:upsertThumb/:group/:id", async (req, res, next) => {
  try {
    logger.info(req.url);
    let entity = null;
    if ( req.params.id.length === 12 || req.params.id.length === 24 ) {
      entity = await entityController.getEntityById(req.params.id);
    }
    if ( !entity ) {
      entity = await entityController.getEntityByName(req.params.group, req.params.id);
    }
    if ( !entity ) {
      entity = await entityController.getEntityByHash(req.params.group, req.params.id);
    }
    if ( entity ) {
      const thumbName = entity.hash + "_thumb.jpg";
      await writeFileComplete(req.body, `entities/${req.params.group}`, thumbName);
      // Update updatedBy field so the broadcast messaging system knows who to send the update to
      entity.updatedBy = req.user._id;
      await entityController.upsertThumb(entity, thumbName);
      res.send("OK");
      return;
    }
    res.sendStatus(204);
  } catch (ex) {
    logger.error("Error upsertThumb: ", ex);
    res.status(400).send(ex);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    logger.info(req.url);
    await entityController.deleteEntity(req.params.id);
    res.sendStatus(201);
  } catch (ex) {
    logger.error("Error delete entity: ", ex);
    res.status(400).send(ex);
  }
});

module.exports = router;
