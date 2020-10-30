// import {readShaderFile, writeShaderFile} from "../controllers/shadersController";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

router.post("/", async (req, res, next) => {

  try {
    res.send(result);
  } catch (ex) {
    logger.error("Error map POST: ", ex);
    res.status(400).send(ex);
  }
});

router.get("/", async (req, res, next) => {

  try {
    res.send(ret);
  } catch (ex) {
    logger.error("Error getting maps: ", ex);
    res.status(400).send(ex);
  }
});


module.exports = router;
