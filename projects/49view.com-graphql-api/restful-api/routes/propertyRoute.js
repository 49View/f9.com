import {scrapeExcaliburFloorplan} from "../controllers/propertyController";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');
const fetch = require('node-fetch');

router.post("/fetch/floorplan/excalibur", async (req, res, next) => {
  try {
    const response = await fetch(req.body.url);
    const text = await response.text();
    const result = scrapeExcaliburFloorplan(req.body.url, text);
    logger.info(req.url);
    res.send(result);
  } catch (ex) {
    logger.error("Error fetching excalibur: ", ex);
    res.status(400).send(ex);
  }
});

module.exports = router;
