import { ApolloError } from "apollo-server-express";
import { MutationResolvers } from "../../generated";

const friendshipMutationResolvers: MutationResolvers = {
  async acceptFriendshipRequest(_parent, { id }, context) {
    const { userService } = context;
    const friendship = await userService.findFriendshipRequest(id);
    if (!friendship)
      throw new ApolloError(`Could not find friendship with id ${id}`);
    if (friendship.acceptedAt)
      throw new ApolloError(
        `Friendship ${id} has already been accepted at ${friendship.acceptedAt.toISOString()}`
      );
    await userService.acceptFriendshipRequest(id);
    const acceptedFriendship = await userService.findFriendshipRequest(id);
    return acceptedFriendship!;
  },
};

export default friendshipMutationResolvers;
