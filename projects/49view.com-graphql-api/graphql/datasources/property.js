import {MongoDataSourceExtended} from "./common";

export class propertyDataSource extends MongoDataSourceExtended {
  async findPartials(partialName) {
    if ( !partialName || partialName.length === 0 ) return null;
    return await this.model.find(
      {
        $or: [
          {addressLine1: {"$regex": partialName, "$options": "i"}},
          {addressLine2: {"$regex": partialName, "$options": "i"}},
          {addressLine3: {"$regex": partialName, "$options": "i"}},
        ],
        status: "live"
      }
    ).limit(10).collation({locale: "en", strength: 2});
  }

}
