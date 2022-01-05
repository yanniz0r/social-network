import { Resolvers } from "../../generated";
import createTextPost from "./create-post-mutation-resolvers";
import likeMutationResolvers from "./like-mutation-resolvers";

const mutationResolvers: Resolvers['Mutation'] = {
  ...createTextPost,
  ...likeMutationResolvers,
}

export default mutationResolvers
