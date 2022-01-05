import { Resolvers } from "../../generated";

const createPostMutationResolvers: Resolvers['Mutation'] = {
  async createTextPost(_parent, { input }, context) {
    const signedInUser = await context.authorizationService.ensureAuthorizedUser()
    const createdPost = await context.postService.createTextPost(signedInUser, input)
    return createdPost
  }
}

export default createPostMutationResolvers
