import { Resolvers } from "../../generated";

const postLikedNotificationTypeResolver: Resolvers["PostLikedNotification"] = {
  id(parent) {
    return parent._id.toString();
  },
  date(parent) {
    return parent.date.toISOString();
  },
  async post(parent, _arguments, context) {
    const post = await context.postService.getPostByID(parent.postID);
    return post!;
  },
  async liker(parent, _arguments, context) {
    const user = await context.userService.findUser(parent.likerID);
    return user!;
  },
};

export default postLikedNotificationTypeResolver;
