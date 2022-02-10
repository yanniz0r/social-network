import { FriendshipModel } from "../../../repositories/user-repository";
import { Resolvers } from "../../generated";

const friendshipRequestNotificationTypeResolver: Resolvers["FriendshipRequestNotification"] =
  {
    id(parent) {
      return parent._id.toString();
    },
    date(parent) {
      return parent.friendship.createdAt.toISOString();
    },
    async from(parent, _arguments, context) {
      const user = await context.userService.findUser(
        parent.friendship.requester
      );
      return user!;
    },
  };

export default friendshipRequestNotificationTypeResolver;
