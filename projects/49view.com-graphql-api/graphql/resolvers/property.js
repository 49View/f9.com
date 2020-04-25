
export default {
  Query: {
    property: (_, args, {dataSources}) => dataSources.properties.findOne(args),
  },

  Property: {
    estateAgent: (property, args, {dataSources}) => dataSources.estateAgents.findOneById(property.estateAgentId),
  }
};
