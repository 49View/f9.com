const furnitureSetController = require("../controllers/furnitureSetController");
const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

router.get("/:name", async (req, res, next) => {
  try {
    const furnitureSet = await furnitureSetController.getSet(req.params.name);
    res.send(furnitureSet);
  } catch (ex) {
    logger.error("[GET] furnitureset: ", ex);
    res.status(400).send(ex);
  }
});

router.post("/", async (req, res, next) => {
    try {
      await furnitureSetController.addSet(req.body);
      res.send(req.body);
    } catch (ex) {
      logger.error("[POST] furnitureset error: ", ex);
      res.sendStatus(400);
    }
  }
);

module.exports = router;
