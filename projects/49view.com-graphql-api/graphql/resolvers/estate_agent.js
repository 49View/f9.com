
export default {
  Query: {
    estateAgent: (_, args, {dataSources}) => dataSources.estateAgents.findOne(args),
  },

};
