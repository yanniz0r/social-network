import { MutationResolvers } from "../../generated"
import config from "config"
import { google } from "googleapis"

const authenticationMutationResolvers: MutationResolvers = {
  async authenticateWithGoogle(_parent, { code, redirectURL }, context, o) {
    const auth = new google.auth.OAuth2({
      clientId: config.get("Auth.google.clientID"),
      clientSecret: config.get("Auth.google.clientSecret"),
      redirectUri: redirectURL,
    })
    const token = await auth.getToken(code)
    auth.setCredentials({ access_token: token.tokens.access_token })
    const userinfo = await google.oauth2({ auth, version: "v2" }).userinfo.get()

    let user = await context.userService.findUserByGoogleID(userinfo.data.id!)
    if (user) {
      // TODO update
    } else {
      user = await context.userService.createUser({
        firstName: userinfo.data.given_name!,
        lastName: userinfo.data.family_name!,
        auth: {
          google: {
            id: userinfo.data.id!
          }
        }
      })
    }

    const jwt = context.authorizationService.createAuthenticationToken(user._id)

    context.setCookie('authentication', jwt)

    return {
      token: jwt,
      user
    }
  }
}

export default authenticationMutationResolvers
