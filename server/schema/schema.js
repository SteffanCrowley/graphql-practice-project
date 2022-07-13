const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;

//create type
const UserType = new graphql.GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});
