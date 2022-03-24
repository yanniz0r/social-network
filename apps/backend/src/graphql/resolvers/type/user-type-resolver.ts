import { differenceInMinutes } from "date-fns";
import config from "config";
import { FriendshipStatus, Resolvers } from "../../generated";

const userTypeResolver: Resolvers["User"] = {
  id(parent) {
    return parent._id.toString();
  },
  name(parent) {
    return [parent.firstName, parent.lastName].join(" ");
  },
  avatarURL({ avatar, updatedAt, _id }) {
    if (!avatar) return null;
    return `${config.get("Common.baseURL")}/static/images/avatar/${_id}${
      updatedAt ? `?c=${updatedAt.getTime()}` : ""
    }`;
  },
  online(parent) {
    if (!parent.lastOnlinePing) {
      return false;
    }
    if (differenceInMinutes(Date.now(), parent.lastOnlinePing) > 5) {
      return false;
    }
    return true;
  },
  async friends(parent, _arguments, context) {
    const friends = await context.userService.findFriendsForUser(parent._id);
    return friends;
  },
  async friendshipStatus(parent, _arguments, context) {
    const authenticatedUser =
      context.authorizationService.ensureAuthorizedUser();

    // Users are not friends with themselves
    if (parent._id.equals(authenticatedUser._id)) {
      return FriendshipStatus.None
    }

    const friendship = await context.userService.findFriendshipBetween(
      authenticatedUser._id,
      parent._id
    );

    if (!friendship) {
      return FriendshipStatus.None;
    }
    if (friendship.acceptedAt) {
      return FriendshipStatus.Friends;
    }
    const authenticatedUserIsRequester = friendship.requester.equals(
      authenticatedUser._id
    );
    const authenticatedUserIsReceiver = friendship.receiver.equals(
      authenticatedUser._id
    );
    if (authenticatedUserIsRequester) {
      return FriendshipStatus.RequestedByMe;
    } else if (authenticatedUserIsReceiver) {
      return FriendshipStatus.RequestedByThem;
    } else {
      return FriendshipStatus.None;
    }
  },
};

export default userTypeResolver;
