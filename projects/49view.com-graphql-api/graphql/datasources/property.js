import {MongoDataSourceExtended} from "./common";

export class propertyDataSource extends MongoDataSourceExtended {
  async findPartials(partialName) {
    if ( !partialName || partialName.length === 0 ) return null;
    const results = await this.model.find(
      {
        $or: [
          {addressLine1: {"$regex": partialName, "$options": "i"}},
          {addressLine2: {"$regex": partialName, "$options": "i"}},
          {addressLine3: {"$regex": partialName, "$options": "i"}},
        ],
        status: "live"
      }
    ).limit(10).collation({locale: "en", strength: 2});

    if ( !results || results.length === 0 ) {
      const extendedSearch = await this.model.find({status: "live"}).limit(10);
      return {
        properties: extendedSearch,
        withinRequestedArea: false
      }
    } else {
      return {
        properties: results,
        withinRequestedArea: true
      };
    }
  }

}
