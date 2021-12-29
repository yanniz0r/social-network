import { gql } from "apollo-server";

const schema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    name: String!
  }

  interface Post {
    id: ID!
    text: String
    createdAt: String!
    user: User!
  }

  type TextPost implements Post {
    id: ID!
    text: String!
    createdAt: String!
    user: User!
  }

  type Query {
    me: User!
    posts: [Post!]!
  }
`

export default schema
