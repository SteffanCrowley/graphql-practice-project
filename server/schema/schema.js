const graphql = require("graphql");

//dummydata
let userData = [
  { id: "1", name: "Bond", age: 36 },
  { id: "33", name: "Fred", age: 33 },
  { id: "343", name: "Michael", age: 23 },
  { id: "5435", name: "Jeff", age: 76 },
  { id: "654653", name: "James", age: 25 },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

//create type
const UserType = new graphql.GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        let user = {
          id: "345",
          age: 33,
          name: "Steffan",
        };

        return user;

        //we resolve with data
        //get and return data from a datasource
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
