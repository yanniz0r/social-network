import { Resolvers } from "../../generated";

const friendshipRequestTypeResolver: Resolvers["FriendshipRequest"] = {
  id(parent) {
    return parent._id.toString();
  },
  date(parent) {
    return parent.acceptedAt ?? parent.createdAt;
  },
  async from(parent, _arguments, context) {
    const from = await context.userService.findUser(parent.requester);
    return from!;
  },
  async to(parent, _arguments, context) {
    const to = await context.userService.findUser(parent.receiver);
    return to!;
  },
};

export default friendshipRequestTypeResolver;
