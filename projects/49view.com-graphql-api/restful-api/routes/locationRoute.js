import {importLocations} from "../controllers/locationController";

const express = require("express");
const router = express.Router();
const logger = require('eh_logger');

router.post("/import/:country", async (req, res, next) => {

  try {
    const result = await importLocations(req.body, req.params.country);
    res.send(result);
  } catch (ex) {
    logger.error("Error importing locations: ", ex);
    res.status(400).send(ex);
  }
});

// router.get("/", async (req, res, next) => {
//
//   try {
//     const ret = await readShaderFile()
//     res.send(ret);
//   } catch (ex) {
//     logger.error("Error retriving shaders: ", ex);
//     res.status(400).send(ex);
//   }
// });


module.exports = router;
