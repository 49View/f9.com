import {MongoDataSourceExtended} from "./common";
import * as metaAssistant from "../../restful-api/assistants/metadataAssistant";
const entityController = require("../../restful-api/controllers/entityController");

export class entityDataSource extends MongoDataSourceExtended {
  async findPartials({partialSearch}) {
    const tags = metaAssistant.splitTagsWithUnion(partialSearch);
    return await entityController.getEntitiesByProjectGroupTags("", "geom", tags, partialSearch);
  }

}
