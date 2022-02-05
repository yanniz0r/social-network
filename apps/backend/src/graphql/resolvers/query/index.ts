import { google } from "googleapis";
import config from "config";
import { QueryResolvers } from "../../generated";
import friendshipResolvers from "./friendship-query-resolvers";
import userResolvers from "./user-query-resolvers";
import notificationResolvers from "./notification-query-resolvers";

const queryResolvers: QueryResolvers = {
  ...friendshipResolvers,
  ...userResolvers,
  ...notificationResolvers,
  googleOAuthURL(_parent, { redirectURL }) {
    const oAuth2 = new google.auth.OAuth2({
      clientId: config.get("Auth.google.clientID"),
      clientSecret: config.get("Auth.google.clientSecret"),
      redirectUri: redirectURL,
    });
    return oAuth2.generateAuthUrl({
      scope: ["PROFILE"],
    });
  },
  async posts(_parent, _result, context) {
    const authenticatedUser =
      context.authorizationService.ensureAuthorizedUser();
    const friends = await context.userService.findFriendsForUser(
      authenticatedUser._id
    );
    return context.postService.getPostsFrom([...friends, authenticatedUser]);
  },
};

export default queryResolvers;
