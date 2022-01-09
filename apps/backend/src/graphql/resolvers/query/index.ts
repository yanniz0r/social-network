import { QueryResolvers } from "../../generated";
import friendshipResolvers from "./friendship-query-resolvers";
import userResolvers from "./user-query-resolvers";

const queryResolvers: QueryResolvers = {
  ...friendshipResolvers,
  ...userResolvers,
  async posts(_parent, _result, context) {
    return context.postService.getPosts();
  },
};

export default queryResolvers;
