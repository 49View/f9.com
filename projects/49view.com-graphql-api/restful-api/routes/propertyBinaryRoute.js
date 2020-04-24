import {writeFile} from "../controllers/fsController";

import {propertyBinaryModel} from "../../models/property_binary";

const BSON = require('bson');
const entityController = require("../controllers/entityController");
const express = require("express");
const router = express.Router();
const tar = require("tar-stream");
const streams = require("memory-streams");
const logger = require('eh_logger');
const db = require("eh_db");

router.get("/:id", async (req, res, next) => {
  try {
    logger.info(req.url);
    const retO = await propertyBinaryModel.findOne({});
    const ret = retO.toObject();
    const metadata = {
      contentType: "image/jpeg",
      ETag: ret.sourceHash
    };
    writeFile(res, metadata, ret.thumbs[0].buffer);
  } catch (ex) {
    console.log("ERROR GETTING ENTITY CONTENT BYGROUPTAGS: ", ex);
    res.status(400).send(ex);
  }
});

module.exports = router;
