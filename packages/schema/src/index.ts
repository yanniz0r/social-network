import { gql } from "graphql-tag";

const schema = gql`
  scalar Date
  scalar Upload

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    name: String!
    friends: [User!]!
    status: String
    online: Boolean!
    birthday: Date
  }

  type Comment {
    createdAt: Date!
    user: User!
    text: String!
  }

  interface Post {
    id: ID!
    text: String
    createdAt: Date!
    user: User!
    liked: Boolean!
    likedBy: [User!]!
    comments: [Comment!]!
  }

  type TextPost implements Post {
    id: ID!
    text: String!
    createdAt: Date!
    user: User!
    liked: Boolean!
    likedBy: [User!]!
    comments: [Comment!]!
  }

  type ImagePost implements Post {
    id: ID!
    text: String
    imageURL: String!
    createdAt: Date!
    user: User!
    liked: Boolean!
    likedBy: [User!]!
    comments: [Comment!]!
  }

  type FriendshipRequest {
    id: ID!
    date: Date!
    from: User!
  }

  input TextPostInput {
    text: String!
  }

  input ImagePostInput {
    text: String
    file: Upload!
  }

  type Query {
    me: User!
    user(id: ID!): User
    friendshipRequests: [FriendshipRequest!]!
    posts: [Post!]!
  }

  type Mutation {
    createTextPost(input: TextPostInput!): TextPost!
    createImagePost(input: ImagePostInput!): ImagePost!
    acceptFriendshipRequest(id: ID!): FriendshipRequest!
    likePost(id: ID!): Post!
    unlikePost(id: ID!): Post!
    commentPost(id: ID!, text: String!): Post!
  }
`;

export default schema;
