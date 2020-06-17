import {estateAgentModel} from "../../models/estate_agent";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');
const db = require('eh_db');

router.post("/", async (req, res, next) => {

  try {
    const query = { name: req.body.name };
    const result = await db.upsert( estateAgentModel, query, req.body);
    if ( !result ) {
      res.sendStatus(204);
    } else {
      res.send(result._id);
    }
  } catch (ex) {
    logger.error("Error POST estate agent: ", ex);
    res.status(400).send(ex);
  }
});

router.get("/:id", async (req, res, next) => {

  try {
    const query = { _id: req.params.id };
    const result = await estateAgentModel.findOne(query);
    if ( !result ) {
      res.sendStatus(204);
    } else {
      res.send(result.toObject());
    }
  } catch (ex) {
    logger.error("Error GET estate agent: ", ex);
    res.status(400).send(ex);
  }
});

module.exports = router;
