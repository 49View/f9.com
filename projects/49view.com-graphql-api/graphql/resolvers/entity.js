import {ApolloError} from "apollo-server-errors";

const dbi = require("eh_db");

export default {
  Query: {
    entity: (_, {name}, {dataSources}) => dataSources.entities.findOne({name: name}),
    entityRefresh: (_, {name,refreshToken}, {dataSources}) => dataSources.entities.findOne({name: name}),
  },

  Mutation: {
    async addEntityTagsMutation(parent, args, {dataSources}) {
      let elem = await dataSources.entities.findOne({_id:args.entityId});
      if (!elem) {
        throw new ApolloError("Add entity tag failed to find entity by Id, quite lame really");
      }
      const tagsCount = elem.tags.length;
      for (const tag of args.tags) {
        if ( !elem.tags.includes(tag) ) {
          elem.tags.push(tag);
        }
      }
      if ( tagsCount !== elem.tags.length ) {
        const upret = await dataSources.entities.updateOne({_id:args.entityId}, elem);
        if (!upret) {
          throw new ApolloError("Entity tag is seriously broken :/ Call Dado on +44 7779 9384856");
        }
      }
      return null;
    },

    async removeEntityTagMutation(parent, args, {dataSources}) {
      let elem = await dataSources.entities.findOne({_id:args.entityId});
      if (!elem) {
        throw new ApolloError("Add entity tag failed to find entity by Id, quite lame really");
      }
      elem.tags = elem.tags.filter( e => e !== args.tag);
      const upret = await dataSources.entities.updateOne({_id:args.entityId}, elem);
      if (!upret) {
        throw new ApolloError("Entity tag is seriously broken :/ Call Dado on +44 7779 9384856");
      }
      return null;
    },

  }
};
