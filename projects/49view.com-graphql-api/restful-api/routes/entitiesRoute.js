import * as metaAssistant from "../assistants/metadataAssistant";
import * as fsController from "../controllers/fsController";

const entityController = require("../controllers/entityController");
const express = require("express");
const router = express.Router();
const tar = require("tar-stream");
const streams = require("memory-streams");
const logger = require('eh_logger');
const db = require("eh_db");

router.get("/:group/:tags", async (req, res, next) => {
  try {
    logger.info(req.url);
    const group = req.params.group;
    const tags = metaAssistant.splitTags(req.params.tags);
    const project = "49View";//req.user.project;
    //Check existing entity for use project (or public)
    const foundEntities = await entityController.getEntitiesByProjectGroupTags(
      project,
      group,
      tags,
      req.params.tags,
      true,
      null
    );
    if (foundEntities !== null && foundEntities.length > 0) {
      let entity = foundEntities[0];
      const fileData = await db.fsDownloadWithId(db.bucketEntities, entity.fsid);
      // If no deps it's a base resouce, just save the file as it is
      if (entity.deps === null || entity.deps.length == 0) {
        fsController.writeFile(res, entity, fileData);
      } else {
        let tarPack = tar.pack();
        let tarDict = [];
        // tarDict.push( { group: entity.group, filename: entity.name } );
        tarPack.entry({name: entity.name}, fileData);
        tarDict.push({
          group: entity.group,
          filename: entity.name,
          hash: entity.hash
        });
        for (const elementGroup of entity.deps) {
          for (const element of elementGroup.value) {
            const depData = await db.fsDownloadWithId(db.bucketEntities, db.objectId(element));
            tarPack.entry(
              {name: element, size: depData.length},
              depData
            );
            tarDict.push({
              group: elementGroup.key,
              filename: element,
              hash: element
            });
          }
        }
        tarPack.entry({name: "catalog"}, JSON.stringify(tarDict));

        tarPack.finalize();
        var writer = new streams.WritableStream();
        tarPack.pipe(writer);
        tarPack.on("end", () => {
          let buff = writer.toBuffer();
          res
            .status(200)
            .set({"Content-Length": Buffer.byteLength(buff)})
            .send(buff);
        });
      }
    } else {
      res.sendStatus(204);
    }
  } catch (ex) {
    console.log("ERROR GETTING ENTITY CONTENT BYGROUPTAGS: ", ex);
    res.status(400).send(ex);
  }
});

module.exports = router;
