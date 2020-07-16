import {MongoDataSource} from "apollo-datasource-mongodb";
const dbi = require("eh_db");

export class MongoDataSourceExtended extends MongoDataSource {
  async get() {
    return await this.model.find({}).collation({locale: "en", strength: 2});
  }

  async find(query) {
    return await this.model.find(query).collation({locale: "en", strength: 2});
  }

  async remove(query) {
    await this.model.remove(query).collation({locale: "en", strength: 2});
    return "OK";
    // The result of remove is a find of the remaining documents, this might change
    // return this.model.find({});
  }

  async findOne(query) {
    const doc = await this.model.findOne(query).collation({locale: "en", strength: 2});
    return doc ? doc.toObject() : null;
  }

  async updateOne(query, data) {
    const doc = await this.model.findOneAndUpdate(query, data);
    return doc.toObject();
  }

  async upsert(query, data) {
    return await dbi.upsert(this.model, query, data);
  }

}
