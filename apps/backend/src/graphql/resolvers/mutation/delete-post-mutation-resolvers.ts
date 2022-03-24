import { Resolvers } from "../../generated";

const createPostMutationResolvers: Resolvers["Mutation"] = {
  async deletePost(_parent, { id }, context) {
    await context.postService.deletePostByID(id)
    return true
  }
};

export default createPostMutationResolvers;
