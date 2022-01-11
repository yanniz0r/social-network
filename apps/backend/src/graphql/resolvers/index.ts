import { UserModel } from "../../repositories/user-repository";
import { Resolvers } from "../generated";
import Mutation from "./mutation";
import { differenceInMinutes } from "date-fns";
import Query from "./query";
import FriendshipRequest from "./type/friendship-request-type-resolver";
import Comment from "./type/comment-type-resolver";
import dateScalar from "./scalar/date";
import { GraphQLUpload } from "graphql-upload";

const resolvers: Resolvers = {
  FriendshipRequest,
  Post: {
    __resolveType(post) {
      switch (post.type) {
        case "text":
          return "TextPost";
        case "image":
          return "ImagePost";
      }
    },
  },
  Upload: GraphQLUpload as any,
  Comment,
  Date: dateScalar,
  User: {
    id(parent) {
      return parent._id.toString();
    },
    name(parent) {
      return [parent.firstName, parent.lastName].join(" ");
    },
    avatarURL({ avatar, updatedAt, _id }) {
      if (!avatar) return null;
      return `http://localhost:4000/static/images/avatar/${_id}${
        updatedAt ? `?c=${updatedAt.getTime()}` : ""
      }`;
    },
    online(parent) {
      if (!parent.lastOnlinePing) {
        return false;
      }
      if (differenceInMinutes(Date.now(), parent.lastOnlinePing) > 5) {
        return false;
      }
      return true;
    },
    async friends(parent, _arguments, context) {
      const friends = await context.userService.findFriendsForUser(parent._id);
      return friends;
    },
  },
  TextPost: {
    id(parent) {
      return parent._id.toString();
    },
    async liked(parent, _arguments, context) {
      const signedInUser =
        await context.authorizationService.ensureAuthorizedUser();
      return parent.likedBy.some((liker) => liker.equals(signedInUser._id));
    },
    likedBy(parent, _result, context) {
      // TODO get rid of casting
      return context.userService.findUsers(parent.likedBy) as Promise<
        UserModel[]
      >;
    },
    async user(textPost, _result, context) {
      const user = await context.userService.findUser(textPost.userID);
      return user!;
    },
    comments(parent) {
      return parent.comments ?? [];
    },
  },
  ImagePost: {
    id(parent) {
      return parent._id.toString();
    },
    async liked(parent, _arguments, context) {
      const signedInUser =
        await context.authorizationService.ensureAuthorizedUser();
      return parent.likedBy.some((liker) => liker.equals(signedInUser._id));
    },
    likedBy(parent, _result, context) {
      // TODO get rid of casting
      return context.userService.findUsers(parent.likedBy) as Promise<
        UserModel[]
      >;
    },
    async user(textPost, _result, context) {
      const user = await context.userService.findUser(textPost.userID);
      return user!;
    },
    comments(parent) {
      return parent.comments ?? [];
    },
    imageURL(parent) {
      return `http://localhost:4000/static/images/image-post/${parent._id}`;
    },
  },
  Query,
  Mutation,
};

export default resolvers;
