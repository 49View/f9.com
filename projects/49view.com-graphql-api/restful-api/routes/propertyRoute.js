import {
  createNewPropertyFromImage,
  listProperties,
  scrapeExcaliburFloorplan,
  upsertProperty
} from "../controllers/propertyController";

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

router.post("/newFromImage/:filename", async (req, res, next) => {

  try {
    const newProperty = await createNewPropertyFromImage(req.body, req.params.filename, req.user._id);
    res.send(newProperty);
  } catch (ex) {
    logger.error("Error newFromImage: ", ex);
    res.status(400).send(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProperty = await upsertProperty(req.body);
    res.send(newProperty);
  } catch (ex) {
    logger.error("Error newFromImage: ", ex);
    res.status(400).send(ex);
  }
});

router.get("/list/:page/:pageSize", async (req, res, next) => {

  try {
    const query = {
      status : req.params.status
    }
    const ret = await listProperties({}, req.params.page, req.params.pageSize);
    res.send(ret);
  } catch (ex) {
    logger.error("Error uploading: ", ex);
    res.status(400).send(ex);
  }
});


module.exports = router;
