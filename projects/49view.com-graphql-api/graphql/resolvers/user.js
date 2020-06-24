export default {
  Query: {
    users: (_, _2, {dataSources}) => dataSources.users.get(),
    user: (_, {name}, {dataSources}) => dataSources.users.findOne({name: name}),
  },

  User: {
    properties:(user, args, {dataSources}) => dataSources.properties.find( {userId: user._id}),
    entities:(user, args, {dataSources}) => dataSources.entities.find( {userId: user._id}),
  }
};
