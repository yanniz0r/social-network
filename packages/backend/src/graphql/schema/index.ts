import { gql } from "apollo-server";

const schema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    name: String!
  }

  type Query {
    me: User!
  }
`

export default schema
