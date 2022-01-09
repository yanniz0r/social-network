import { Resolvers } from "../../generated";

const commentTypeResolver: Resolvers['Comment'] = {
  async user(parent, _arguments, context) {
    const user = await context.userService.findUser(parent.userID)
    return user! // TODO check if the user is acutally there
  }
}

export default commentTypeResolver
