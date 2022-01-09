import { Resolvers } from "../../generated";

const likeMutationResolvers: Resolvers["Mutation"] = {
  async likePost(_parent, { id }, context) {
    const signedInUser =
      await context.authorizationService.ensureAuthorizedUser();
    const post = await context.postService.getPostByID(id);
    if (!post) throw new Error("Could not find post to like");
    await context.postService.likePost(signedInUser, post);
    const updatedPost = await context.postService.getPostByID(id);
    return updatedPost!;
  },
  async unlikePost(_parent, { id }, context) {
    const signedInUser =
      await context.authorizationService.ensureAuthorizedUser();
    const post = await context.postService.getPostByID(id);
    if (!post) throw new Error("Could not find post to unlike");
    await context.postService.unlikePost(signedInUser, post);
    const updatedPost = await context.postService.getPostByID(id);
    return updatedPost!;
  },
};

export default likeMutationResolvers;
