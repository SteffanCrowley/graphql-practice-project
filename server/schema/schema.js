const graphql = require("graphql");
var _ = require("lodash");

//dummydata
let userData = [
  { id: "1", name: "Bond", age: 36, profession: "programmer" },
  { id: "33", name: "Fred", age: 33, profession: "warrior" },
  { id: "343", name: "Michael", age: 23, profession: "mage" },
  { id: "5435", name: "Jeff", age: 76, profession: "fighter" },
  { id: "654653", name: "James", age: 25, profession: "quartermaster" },
];

//dummydata
let hobbiesData = [
  { id: "6", title: "Programming", description: "guy who codes", userId: "1" },
  { id: "2", title: "runner", description: "guy who writes", userId: "1" },
  { id: "3", title: "fireman", description: "interesting things", userId: "1" },
  { id: "4", title: "police", description: "whatever i say", userId: "1" },
  { id: "5", title: "flamethrower", description: "a funny story", userId: "1" },
];

//dummydata
let postData = [
  { id: "9", comment: "a funny story", userId: "1" },
  { id: "10", comment: "a sad story", userId: "1" },
  { id: "11", comment: "a wacky story", userId: "33" },
  { id: "12", comment: "a zany story", userId: "33" },
  { id: "13", comment: "a important story", userId: "343" },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

//create type
const UserType = new graphql.GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postData, { userId: parent.id });
      },
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "post",
  description: "post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      },
    },
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
        return _.find(userData, { id: args.id });

        //we resolve with data
        //get and return data from a datasource
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
        //return data for our hobby
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(postData, { id: args.id });
        //return data for our hobby
      },
    },
  },
});

//Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        // id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },

      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };
        return user;
      },
    },
    createPost: {
      type: PostType,
      args: {
        // id: { type: GraphQLID },
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },

      resolve(parent, args) {
        let post = {
          comment: args.comment,
          userId: args.userId,
        };
        return post;
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
