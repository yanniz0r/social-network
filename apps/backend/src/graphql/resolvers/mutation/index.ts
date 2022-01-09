import { Resolvers } from "../../generated";
import createTextPost from "./create-post-mutation-resolvers";
import friendshipMutationResolvers from "./friendship-mutation-resolvers";
import likeMutationResolvers from "./like-mutation-resolvers";
import commentMutationResolvers from "./comment-mutation-resolvers";
import { FileUpload, Upload } from "graphql-upload";

const mutationResolvers: Resolvers["Mutation"] = {
  ...createTextPost,
  ...likeMutationResolvers,
  ...friendshipMutationResolvers,
  ...commentMutationResolvers,
};

export default mutationResolvers;
