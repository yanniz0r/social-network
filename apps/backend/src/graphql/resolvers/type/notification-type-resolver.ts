import { Resolvers } from "../../generated";

const notifiationTypeResolver: Resolvers["Notification"] = {
  __resolveType(notification) {
    switch(notification.type) {
      case 'friendship-request':
        return 'FriendshipRequestNotification'
      case 'post-liked':
        return 'PostLikedNotification'
    }
  },
  id(parent) {
    return parent._id.toString()
  }
};

export default notifiationTypeResolver;
