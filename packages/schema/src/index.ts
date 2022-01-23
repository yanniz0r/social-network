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
    friendshipStatus: FriendshipStatus
    avatarURL: String
  }

  enum FriendshipStatus {
    REQUESTED_BY_ME
    REQUESTED_BY_THEM
    FRIENDS
    NONE
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
    to: User!
  }

  input TextPostInput {
    text: String!
  }

  input ImagePostInput {
    text: String
    file: Upload!
  }

  input UpdateMeInput {
    avatar: Upload
  }

  type Authentication {
    user: User!
    token: String!
  }

  type Query {
    me: User!
    user(id: ID!): User
    searchUsers(query: String!): [User!]!
    friendshipRequests: [FriendshipRequest!]!
    friendshipRecommendations: [User!]!
    posts: [Post!]!
    googleOAuthURL(redirectURL: String!): String!
  }

  type Mutation {
    updateMe(input: UpdateMeInput!): User!
    createTextPost(input: TextPostInput!): TextPost!
    createImagePost(input: ImagePostInput!): ImagePost!
    acceptFriendshipRequest(id: ID!): FriendshipRequest!
    requestFriendship(id: ID!): FriendshipRequest!
    likePost(id: ID!): Post!
    unlikePost(id: ID!): Post!
    commentPost(id: ID!, text: String!): Post!
    authenticateWithGoogle(code: String!, redirectURL: String!): Authentication!
  }
`;

export default schema;
