import {MongoDataSourceExtended} from "./datasources/common";
import {entityModel} from "../models/entity";
import {propertyModel} from "../models/property";
import {locationModel} from "../models/location";
import {estateAgentModel} from "../models/estate_agent";
import {propertyDataSource} from "./datasources/property";
import {locationDataSource} from "./datasources/location";
import {entityDataSource} from "./datasources/entity";

const usersModel = require("eh_auth_and_auth/models/user");

export default () => ({
    properties: new propertyDataSource(propertyModel),
    users: new MongoDataSourceExtended(usersModel),
    estateAgents: new MongoDataSourceExtended(estateAgentModel),
    entities: new entityDataSource(entityModel),
    locations: new locationDataSource(locationModel),
});
