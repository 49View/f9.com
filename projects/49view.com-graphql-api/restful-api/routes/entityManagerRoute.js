import * as metaAssistant from "../assistants/metadataAssistant";
import * as fsController from "../controllers/fsController";
import {writeFileComplete} from "../controllers/fsController";
import {uploadModel} from "../../models/upload";

const entityController = require("../controllers/entityController");
const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

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
