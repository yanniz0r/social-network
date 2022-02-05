import { google } from "googleapis";
import config from "config";
import { QueryResolvers } from "../../generated";
import friendshipResolvers from "./friendship-query-resolvers";
import userResolvers from "./user-query-resolvers";
import notificationResolvers from "./notification-query-resolvers";
import postQueryResolvers from "./post-query-resolvers";

const queryResolvers: QueryResolvers = {
  ...friendshipResolvers,
  ...userResolvers,
  ...notificationResolvers,
  ...postQueryResolvers,
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
};

export default queryResolvers;
