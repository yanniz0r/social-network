import { Resolvers } from "../../generated";
import createTextPost from "./create-text-post-mutation-resolver";

const mutationResolvers: Resolvers['Mutation'] = {
  ...createTextPost,
}

export default mutationResolvers
