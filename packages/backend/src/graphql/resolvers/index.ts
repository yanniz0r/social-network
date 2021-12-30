import { UserModel } from "../../repositories/user-repository";
import { Resolvers } from "../generated";

const resolvers: Resolvers = {
  Post: {
    __resolveType(post) {
      switch (post.type) {
        case "text":
          return "TextPost";
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
  },
  TextPost: {
    id(parent) {
      return parent._id.toString();
    },
    liked(parent) {
      return Math.random() > 0.5;
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
};

export default resolvers;
