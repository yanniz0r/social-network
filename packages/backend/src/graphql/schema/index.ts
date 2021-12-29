import { gql } from "apollo-server";

const schema = gql`
  type Query {
    test: String
  }
`

export default schema
