import { UserModel } from "../../repositories/user-repository";
import { Resolvers } from "../generated";
import Mutation from "./mutation";
import { differenceInMinutes } from "date-fns";
import Query from "./query";
import FriendshipRequest from "./type/friendship-request-type-resolver";
import Comment from "./type/comment-type-resolver";
import dateScalar from "./scalar/date";

const resolvers: Resolvers = {
  FriendshipRequest,
  Post: {
    __resolveType(post) {
      switch (post.type) {
        case "text":
          return "TextPost";
        case "image":
          return "TextPost"; // TODO this makes no sense at all. Fix once we got image posts
      }
    },
  },
  Comment,
  Date: dateScalar,
  User: {
    id(parent) {
      return parent._id.toString();
    },
    name(parent) {
      return [parent.firstName, parent.lastName].join(" ");
    },
    online(parent) {
      if (!parent.lastOnlinePing) {
        return false
      }
      if (differenceInMinutes(Date.now(), parent.lastOnlinePing) > 5) {
        return false
      }
      return true
    },
    async friends(parent, _arguments, context) {
      const friends = await context.userService.findFriendsForUser(parent._id)
      return friends
    }
  },
  TextPost: {
    id(parent) {
      return parent._id.toString();
    },
    async liked(parent, _arguments, context) {
      const signedInUser = await context.authorizationService.ensureAuthorizedUser()
      return parent.likedBy.some(liker => liker.equals(signedInUser._id))
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
      return parent.comments ?? []
    },
  },
  Query,
  Mutation,
};

export default resolvers;
