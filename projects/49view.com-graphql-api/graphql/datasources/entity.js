import {MongoDataSourceExtended} from "./common";
import * as metaAssistant from "../../restful-api/assistants/metadataAssistant";
const entityController = require("../../restful-api/controllers/entityController");

export class entityDataSource extends MongoDataSourceExtended {
  async findPartials({partialSearch, group, page, pageLimit}) {
    const tags = metaAssistant.splitTagsWithUnion(partialSearch);
    return await entityController.getEntitiesByProjectGroupTagsPaginated("", group, tags, partialSearch, page, pageLimit);
  }

}
