import {furnitureSetModel} from "../../models/furniture_set";
import * as metadataAssistant from "../assistants/metadataAssistant";
const db = require("eh_db");
const entityController = require("../controllers/entityController");

exports.addSet = async furnitureSet => {
  return await db.upsert(furnitureSetModel, {name: furnitureSet.name}, furnitureSet);
};

exports.getSet = async name => {

  const furnitureSetO = await furnitureSetModel.findOne( {name} );
  const furnitureSet = furnitureSetO.toObject();

  let furnitureSetWithBBox = {
    set: []
  };
  for (const elem of furnitureSet.set) {
    const name = elem.name.toLowerCase();
    const tags = metadataAssistant.splitTagsWithUnion(name);
    const elemMeta = await entityController.getEntitiesByProjectGroupTags("", "geom", tags, name);
    if ( elemMeta && elemMeta[0] ) {
      furnitureSetWithBBox.set.push( {
        ...elem,
        bboxSize: elemMeta[0].bboxSize
      });
    }
  }

  return furnitureSetWithBBox;
 // return await db.upsert(furnitureSetModel, {name: furnitureSet.name}, furnitureSet);
};

