import {MongoDataSourceExtended} from "./common";

export class locationDataSource extends MongoDataSourceExtended {
  async findPartials(partialName) {
    if ( !partialName || partialName.length === 0 ) return null;
    return await this.model.find({locationName: {"$regex": "^"+partialName, "$options": "i"}}).limit(10).collation({
      locale: "en",
      strength: 2
    });
  }

}
