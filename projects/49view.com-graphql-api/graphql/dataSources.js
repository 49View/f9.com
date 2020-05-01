import {MongoDataSourceExtended} from "./datasources/common";
import {propertyModel} from "../models/property";
import {estateAgentModel} from "../models/estate_agent";
import {propertyDataSource} from "./datasources/property";

const usersModel = require("eh_auth_and_auth/models/user");

export default () => ({
    properties: new propertyDataSource(propertyModel),
    users: new MongoDataSourceExtended(usersModel),
    estateAgents: new MongoDataSourceExtended(estateAgentModel),
});
