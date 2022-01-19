import { QueryResolvers } from "../../generated";

const friendshipResolvers: QueryResolvers = {
  async friendshipRequests(_parent, _aruments, context) {
    const authenticatedUser = context.authorizationService.ensureAuthorizedUser();
    return context.userService.findFriendshipRequestsForUser(
      authenticatedUser._id
    );
  },
};

export default friendshipResolvers;
