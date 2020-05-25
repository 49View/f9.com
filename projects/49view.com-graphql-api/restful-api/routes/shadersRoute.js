import {readShaderFile, writeShaderFile} from "../controllers/shadersController";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

router.post("/", async (req, res, next) => {

  try {
    const result = await writeShaderFile(req.body);
    res.send(result);
  } catch (ex) {
    logger.error("Error posting shaders: ", ex);
    res.status(400).send(ex);
  }
});

router.get("/", async (req, res, next) => {

  try {
    const ret = await readShaderFile()
    res.send(ret);
  } catch (ex) {
    logger.error("Error retriving shaders: ", ex);
    res.status(400).send(ex);
  }
});


module.exports = router;
