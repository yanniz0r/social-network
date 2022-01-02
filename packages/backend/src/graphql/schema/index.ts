import { gql } from "apollo-server";

const schema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    name: String!
    friends: [User!]!
  }

  interface Post {
    id: ID!
    text: String
    createdAt: String!
    user: User!
    liked: Boolean!
    likedBy: [User!]!
  }

  type TextPost implements Post {
    id: ID!
    text: String!
    createdAt: String!
    user: User!
    liked: Boolean!
    likedBy: [User!]!
  }

  input TextPostInput {
    text: String!
  }

  type Query {
    me: User!
    posts: [Post!]!
  }

  type Mutation {
    createTextPost(input: TextPostInput!): TextPost!
    likePost(id: ID!): Post!
    unlikePost(id: ID!): Post!
  }
`;

export default schema;
