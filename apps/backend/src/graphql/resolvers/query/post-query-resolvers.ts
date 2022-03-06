import { QueryResolvers } from "../../generated";

const postQueryResolvers: QueryResolvers = {
  async posts(_parent, _arguments, context) {
    const authenticatedUser =
      context.authorizationService.ensureAuthorizedUser();
    const friends = await context.userService.findFriendsForUser(
      authenticatedUser._id
    );
    const userIds = [...friends, authenticatedUser].map((user) => user._id);
    return context.postService.getPostsFrom(userIds);
  },
  async postsOfUser(_parent, { id }, context) {
    const posts = await context.postService.getPostsFrom([id]);
    return posts;
  },
  async myPosts(_parent, _arguments, context) {
    const currentUser = context.authorizationService.ensureAuthorizedUser()
    const posts = await context.postService.getPostsFrom([currentUser._id]);
    return posts;
  },
};

export default postQueryResolvers;
