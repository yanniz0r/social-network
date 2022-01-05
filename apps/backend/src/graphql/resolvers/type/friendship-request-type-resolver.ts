import { Resolvers } from "../../generated";

const friendshipRequestTypeResolver: Resolvers['FriendshipRequest'] = {
  id(parent) {
    return parent._id.toString()
  },
  date(parent) {
    return parent.createdAt.toISOString()
  },
  async from(parent, _arguments, context) {
    const from = await context.userService.findUser(parent.requester)
    return from!
  }
}

export default friendshipRequestTypeResolver
