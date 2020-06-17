import {listProperties, scrapeExcaliburFloorplan} from "../controllers/propertyController";

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

router.get("/list/:status/:page/:pageSize", async (req, res, next) => {

  try {
    const query = {
      status : req.params.status
    }
    const ret = await listProperties( query, req.params.page, req.params.pageSize);
    res.send(ret);
  } catch (ex) {
    logger.error("Error uploading: ", ex);
    res.status(400).send(ex);
  }
});


module.exports = router;
