import {MongoDataSourceExtended} from "./datasources/common";
import {propertyModel} from "../models/property";

const usersModel = require("eh_auth_and_auth/models/user");

export default () => ({
    properties: new MongoDataSourceExtended(propertyModel),
    users: new MongoDataSourceExtended(usersModel),
});
