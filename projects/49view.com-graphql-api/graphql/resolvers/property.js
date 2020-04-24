
export default {
  Query: {
    property: (_, args, {dataSources}) => dataSources.properties.findOne(args),
  },

};
