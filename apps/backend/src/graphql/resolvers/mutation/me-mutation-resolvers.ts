import { Upload } from "graphql-upload";
import { Resolvers } from "../../generated";

const meMutationResolvers: Resolvers["Mutation"] = {
  async updateMe(_parent, { input }, context) {
    const signedInUser =
      await context.authorizationService.ensureAuthorizedUser();

    const avatarUpload = input.avatar as Upload;
    if (avatarUpload) {
      await context.userService.setAvatar(signedInUser._id, await avatarUpload);
    }
    await context.userService.updateUser(signedInUser._id, {
      ...input.birthday && {
        birthday: input.birthday
      },
      ...input.hobbys && {
        hobbies: input.hobbys
      },
      ...input.jobCompany && input.jobPosition && {
        job: {
          company: input.jobCompany,
          position: input.jobPosition,
        }
      }
    })

    return context.authorizationService.ensureAuthorizedUser();
  },
};

export default meMutationResolvers;
