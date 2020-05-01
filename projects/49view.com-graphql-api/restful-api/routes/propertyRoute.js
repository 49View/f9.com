import {scrapeExcaliburFloorplan} from "../controllers/propertyController";
import {getFileName} from "eh_helpers";
import {saveImageFromUrl} from "../controllers/fsController";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

router.post("/fetch/floorplan/excalibur", async (req, res, next) => {

  try {
    const result = await scrapeExcaliburFloorplan(req.body.url, req.user._id, req.body.upsert);
    if ( !result ) {
      res.sendStatus(204);
    } else {
      res.send(result);
    }
  } catch (ex) {
    logger.error("Error fetching excalibur: ", ex);
    res.status(400).send(ex);
  }
});

router.post("/upload", async (req, res, next) => {

  try {
    const ret = await saveImageFromUrl(req.body.url, "uploads", () => getFileName(req.body.url));
    res.send(ret);
  } catch (ex) {
    logger.error("Error uploading: ", ex);
    res.status(400).send(ex);
  }
});


module.exports = router;
