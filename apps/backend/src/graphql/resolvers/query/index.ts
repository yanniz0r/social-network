import { QueryResolvers } from "../../generated";
import friendshipResolvers from "./friendship-query-resolvers";


const queryResolvers: QueryResolvers = {
  ...friendshipResolvers,
  async me(_parent, _result, context) {
    const user = await context.userService.getUser();
    return user;
  },
  async posts(_parent, _result, context) {
    return context.postService.getPosts();
  },
}

export default queryResolvers