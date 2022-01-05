import { gql } from "graphql-tag";

const schema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    name: String!
    friends: [User!]!
    status: String
    online: Boolean!
    birthday: String
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
  
  type FriendshipRequest {
    id: ID!
    date: String!
    from: User!
  }

  input TextPostInput {
    text: String!
  }
  
  type Query {
    me: User!
    user(id: ID!): User
    friendshipRequests: [FriendshipRequest!]!
    posts: [Post!]!
  }

  type Mutation {
    createTextPost(input: TextPostInput!): TextPost!
    acceptFriendshipRequest(id: ID!): FriendshipRequest!
    likePost(id: ID!): Post!
    unlikePost(id: ID!): Post!
  }
`;

export default schema;
