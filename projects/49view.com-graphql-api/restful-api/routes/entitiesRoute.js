import * as metaAssistant from "../assistants/metadataAssistant";
import * as fsController from "../controllers/fsController";
import {writeFileComplete} from "../controllers/fsController";

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
    const mainPath = `entities/${group}`;
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
      fsController.writeResFile(res, entity, fsController.readFile(mainPath, entity.hash));

      // const fileData = await db.fsDownloadWithId(db.bucketEntities, entity.fsid);
      // // If no deps it's a base resouce, just save the file as it is
      // if (entity.deps === null || entity.deps.length === 0) {
      //   await writeFileComplete(fileData, mainPath, entity.hash);
      //
      //   fsController.writeResFile(res, entity, fileData);
      // } else {
      //   let tarPack = tar.pack();
      //   let tarDict = [];
      //   // tarDict.push( { group: entity.group, filename: entity.name } );
      //   tarPack.entry({name: entity.name}, fileData);
      //   tarDict.push({
      //     group: entity.group,
      //     filename: entity.name,
      //     hash: entity.hash
      //   });
      //   for (const elementGroup of entity.deps) {
      //     for (const element of elementGroup.value) {
      //       const depData = await db.fsDownloadWithId(db.bucketEntities, db.objectId(element));
      //       await tarPack.entry(
      //         {name: element, size: depData.length},
      //         depData
      //       );
      //       tarDict.push({
      //         group: elementGroup.key,
      //         filename: element,
      //         hash: element
      //       });
      //     }
      //   }
      //   await tarPack.entry({name: "catalog"}, JSON.stringify(tarDict));
      //
      //   await tarPack.finalize();
      //
      //   var writer = new streams.WritableStream();
      //   tarPack.pipe(writer);
      //
      //   // let buff = writer.toBuffer();
      //   // res
      //   //   .status(200)
      //   //   .set({"Content-Length": Buffer.byteLength(buff)})
      //   //   .send(buff);
      //   // console.log(req.params.tags + " status: 200, length: "+ Buffer.byteLength(buff))
      //
      //   tarPack.on("end", async () => {
      //     let buff = writer.toBuffer();
      //     const ffn = writeFileComplete(buff, mainPath, entity.hash);
      //     // res
      //     //   .status(200)
      //     //   .set({"Content-Length": Buffer.byteLength(buff)})
      //     //   .send(buff);
      //     res.send(ffn);
      //     console.log(req.params.tags + " status: 200, length: "+ Buffer.byteLength(buff))
      //   });
      // }
    } else {
      res.sendStatus(204);
    }
  } catch (ex) {
    console.log("ERROR GETTING ENTITY CONTENT BYGROUPTAGS: ", ex);
    res.status(400).send(ex);
  }
});

router.post(
  "/:filename/:filenameFSID/:project/:group/:username/:useremail",
  async (req, res, next) => {
    try {
      logger.info("Post from daemon...");

      const entity = await entityController.createEntity(
        req.params.filenameFSID,
        req.params.filename,
        decodeURIComponent(req.params.project),
        req.params.group,
        decodeURIComponent(req.params.username),
        decodeURIComponent(req.params.useremail)
      );

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

// // Data is going to be in body
// router.post(
//   "/:filename/:group",
//   async (req, res, next) => {
//     try {
//       logger.info("Post from daemon...");
//
//       db.fsUpsert( db.bucketEntities, req.params.filename, req.body, )
//       const entity = await entityController.createEntity(
//         req.params.filenameFSID,
//         req.params.filename,
//         decodeURIComponent(req.params.project),
//         req.params.group,
//         decodeURIComponent(req.params.username),
//         decodeURIComponent(req.params.useremail)
//       );
//
//       if (entity !== null) {
//         res
//           .status(201)
//           .json(entity)
//           .end();
//       } else {
//         throw "[post.entity] Entity created is null";
//       }
//     } catch (ex) {
//       console.log("[POST] Entity error: ", ex);
//       res.sendStatus(400);
//     }
//   }
// );

module.exports = router;
