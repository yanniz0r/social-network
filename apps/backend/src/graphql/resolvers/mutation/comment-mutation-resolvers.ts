import { ApolloError } from "apollo-server";
import { MutationResolvers } from "../../generated";


const commentMutationResolvers: MutationResolvers = {
  async commentPost(_parent, { id, text }, context) {
    const post = await context.postService.getPostByID(id)
    const signedInUser = await context.authorizationService.ensureAuthorizedUser()
    if (!post) throw new ApolloError(`Could not find post ${id} to comment on`)
    await context.postService.commentPost(signedInUser._id, post._id, text)

    await new Promise(resolve => setTimeout(resolve, 5000))

    const updatedPost = await context.postService.getPostByID(id)
    return updatedPost!
  }
}

export default commentMutationResolvers
