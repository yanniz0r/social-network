import { QueryResolvers } from "../../generated";

const notificationResolvers: QueryResolvers = {
  notifications(_parent, _arguments, context) {
    const signedInUser = context.authorizationService.ensureAuthorizedUser();
    return context.notificationService.getNotificationsForUser(
      signedInUser._id
    );
  },
};

export default notificationResolvers;
