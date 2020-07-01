
export default {
  Query: {
    partialLocation: (_, {partialName}, {dataSources}) => dataSources.locations.findPartials(partialName),
  },
};
