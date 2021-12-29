import { gql } from "apollo-server";

const schema = gql`
  type User {
    firstName: String!
    lastName: String!
  }

  type Query {
    me: User!
  }
`

export default schema
