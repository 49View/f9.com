import {MongoDataSourceExtended} from "./datasources/common";
import {propertyModel} from "../models/property";
import {estateAgentModel} from "../models/estate_agent";

const usersModel = require("eh_auth_and_auth/models/user");

export default () => ({
    properties: new MongoDataSourceExtended(propertyModel),
    users: new MongoDataSourceExtended(usersModel),
    estateAgents: new MongoDataSourceExtended(estateAgentModel),
});
