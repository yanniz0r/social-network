import { QueryResolvers } from "../../generated";

const userResolvers: QueryResolvers = {
  async user(_parent, { id }, context) {
    return context.userService.findUser(id);
  },
  async me(_parent, _result, context) {
    const user = await context.authorizationService.ensureAuthorizedUser();
    return user;
  },
};

export default userResolvers;
