import { Upload } from "graphql-upload";
import { Resolvers } from "../../generated";

const meMutationResolvers: Resolvers["Mutation"] = {
  async updateMe(_parent, { input }, context) {
    const signedInUser =
      await context.authorizationService.ensureAuthorizedUser();

    const avatarUpload = input.avatar as Upload;
    await context.userService.setAvatar(signedInUser._id, await avatarUpload);

    return context.authorizationService.ensureAuthorizedUser();
  },
};

export default meMutationResolvers;
