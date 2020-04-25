import {writeFile} from "../controllers/fsController";
import {propertyBinaryModel} from "../../models/property_binary";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

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
