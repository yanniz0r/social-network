import { UserModel } from "../../repositories/user-repository";
import { Resolvers } from "../generated";
import Mutation from "./mutation";

const resolvers: Resolvers = {
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
  User: {
    id(parent) {
      return parent._id.toString();
    },
    name(parent) {
      return [parent.firstName, parent.lastName].join(" ");
    },
    birthday(parent) {
      return parent.birthday?.toISOString() ?? null
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
    createdAt(parent) {
      return parent.createdAt.toISOString();
    },
  },
  Query: {
    async me(_parent, _result, context) {
      const user = await context.userService.getUser();
      return user;
    },
    async posts(_parent, _result, context) {
      return context.postService.getPosts();
    },
  },
  Mutation,
};

export default resolvers;
