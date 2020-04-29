import {propertyBimModel} from "../../models/property_bim";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');
const db = require('eh_db');


router.post("/:id", async (req, res, next) => {

  try {
    const query = { propertyId: req.params.id };
    const data = {
      ...JSON.parse(req.body),
      ...query
    };

    const result = await db.upsert( propertyBimModel, query, data);
    if ( !result ) {
      res.sendStatus(204);
    } else {
      res.send(result._id);
    }
  } catch (ex) {
    logger.error("Error fetching excalibur: ", ex);
    res.status(400).send(ex);
  }
});

router.get("/:id", async (req, res, next) => {

  try {
    const query = { propertyId: req.params.id };
    const result = await propertyBimModel.findOne(query);
    if ( !result ) {
      res.sendStatus(204);
    } else {
      res.send(result.toObject());
    }
  } catch (ex) {
    logger.error("Error fetching excalibur: ", ex);
    res.status(400).send(ex);
  }
});

module.exports = router;