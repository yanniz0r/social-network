import { Resolvers } from "../../generated";
import createTextPost from "./create-post-mutation-resolvers";
import friendshipMutationResolvers from "./friendship-mutation-resolvers";
import likeMutationResolvers from "./like-mutation-resolvers";
import commentMutationResolvers from "./comment-mutation-resolvers";
import meMutationResolvers from "./me-mutation-resolvers";
import authenticationMutationResolvers from "./authentication-mutation-resolvers";
import deletePostMutationResolvers from "./delete-post-mutation-resolvers";

const mutationResolvers: Resolvers["Mutation"] = {
  ...createTextPost,
  ...likeMutationResolvers,
  ...friendshipMutationResolvers,
  ...commentMutationResolvers,
  ...meMutationResolvers,
  ...authenticationMutationResolvers,
  ...deletePostMutationResolvers
};

export default mutationResolvers;
