import {scrapeExcaliburFloorplan} from "../controllers/propertyController";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');


router.post("/fetch/floorplan/excalibur", async (req, res, next) => {

  try {
    const result = await scrapeExcaliburFloorplan(req.body.url);
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

module.exports = router;
