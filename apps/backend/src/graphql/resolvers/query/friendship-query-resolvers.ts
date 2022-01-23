import { QueryResolvers } from "../../generated";

const friendshipResolvers: QueryResolvers = {
  async friendshipRecommendations(_parent, _arguments, context) {
    const authenticatedUser =
      context.authorizationService.ensureAuthorizedUser();

    const recommendations = await context.userService.getFriendRecommendations(
      authenticatedUser._id
    );

    return recommendations;
  },
  async friendshipRequests(_parent, _aruments, context) {
    const authenticatedUser =
      context.authorizationService.ensureAuthorizedUser();
    return context.userService.findFriendshipRequestsForUser(
      authenticatedUser._id
    );
  },
};

export default friendshipResolvers;
