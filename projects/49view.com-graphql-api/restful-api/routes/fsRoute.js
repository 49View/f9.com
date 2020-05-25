import {writeFileComplete, writeFileCompleteInsertNewNameIfExists} from "../controllers/fsController";
import {uploadModel} from "../../models/upload";
import * as entityController from "../controllers/entityController";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

router.post("/:group/:id", async (req, res, next) => {
  try {
    const fname = await writeFileComplete(req.body, `uploads/${req.params.group}`, req.params.id);
    // We might re-enable this later but I have the suspicous that mangling around with file names etc will
    // create more problem than it solves, and it goes somehow against the functional programming principle.
    // const fname = await writeFileCompleteInsertNewNameIfExists(req.body, `uploads/${req.params.group}`, req.params.id);
    const asset = new uploadModel({
      filename: fname,
      group: req.params.group,
      project: req.user.project || "",
      username: req.user.name,
      userId: req.user._id,
    });
    await asset.save();
    res.send(asset);
  } catch (ex) {
    logger.error("Error fetching excalibur: ", ex);
    res.status(400).send(ex);
  }
});

router.post("/asset",
  async (req, res, next) => {
    try {
      logger.info("Post from daemon...");

      const entity = await entityController.createEntity(req.body);

      if (entity !== null) {
        res
          .status(201)
          .json(entity)
          .end();
      } else {
        throw "[post.entity] Entity created is null";
      }
    } catch (ex) {
      console.log("[POST] Entity error: ", ex);
      res.sendStatus(400);
    }
  }
);

module.exports = router;
