import { ApolloError } from "apollo-server-express";
import { MutationResolvers } from "../../generated";

const friendshipMutationResolvers: MutationResolvers = {
  async requestFriendship(_parent, { id }, context) {
    const authenticatedUser =
      await context.authorizationService.ensureAuthorizedUser();
    const user = await context.userService.findUser(id);
    if (!user) throw Error(`Can not find user with id ${id}`);
    const friendship = await context.userService.createFriendship(
      authenticatedUser,
      user
    );
    await context.notificationService.createFriendshipRequestNotification(friendship)
    return friendship;
  },
  async acceptFriendshipRequest(_parent, { id }, context) {
    const { userService } = context;
    const friendship = await userService.findFriendship(id);
    if (!friendship)
      throw new ApolloError(`Could not find friendship with id ${id}`);
    if (friendship.acceptedAt)
      throw new ApolloError(
        `Friendship ${id} has already been accepted at ${friendship.acceptedAt.toISOString()}`
      );
    await userService.acceptFriendshipRequest(id);
    const acceptedFriendship = await userService.findFriendship(id);
    return acceptedFriendship!;
  },
};

export default friendshipMutationResolvers;
