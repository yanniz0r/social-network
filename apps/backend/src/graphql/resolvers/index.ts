import { UserModel } from "../../repositories/user-repository";
import { Resolvers } from "../generated";
import Mutation from "./mutation";
import Query from "./query";
import FriendshipRequest from "./type/friendship-request-type-resolver";
import Comment from "./type/comment-type-resolver";
import User from "./type/user-type-resolver";
import Notification from "./type/notification-type-resolver";
import FriendshipRequestNotification from "./type/friendship-request-notification-type-resolver";
import dateScalar from "./scalar/date";
import { GraphQLUpload } from "graphql-upload";
import config from "config";
import { NotificationModel } from "../../repositories/notification-repository";
import { Context } from "../../context";
import { ObjectId } from "mongodb";

const resolvers: Resolvers = {
  FriendshipRequest,
  FriendshipRequestNotification,
  Notification,
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
  User,
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
      const signedInUser = context.authorizationService.ensureAuthorizedUser();
      return parent.likedBy.some((liker) => {
        if (!liker) {
          console.log({
            liker,
            parent,
          });
        }
        return liker.equals(signedInUser._id);
      });
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
      return `${config.get("Common.baseURL")}/static/images/image-post/${
        parent._id
      }`;
    },
  },
  Query,
  Mutation,
  Subscription: {
    newNotification: {
      async resolve(parent: ObjectId, _arguments: {}, context: Context): Promise<NotificationModel> {
        const notification = await context.notificationService.getNotification(parent)
        return notification!
      },
      subscribe(_parent, _arguments, context) {
        const authenticateUser = context.authorizationService.ensureAuthorizedUser()
        return context.notificationService.subscribeToNewNotifications(authenticateUser._id)
      },
    }
  }
};

export default resolvers;
