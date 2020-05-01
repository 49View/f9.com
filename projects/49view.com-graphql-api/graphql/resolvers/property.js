
export default {
  Query: {
    property: (_, args, {dataSources}) => dataSources.properties.findOne(args),
    propertyPartial: (_, args, {dataSources}) => dataSources.properties.findPartials(args.partialName),
  },

  Property: {
    estateAgent: (property, args, {dataSources}) => dataSources.estateAgents.findOneById(property.estateAgentId),
  }
};
