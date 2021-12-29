import { Resolvers } from "../generated";


const resolvers: Resolvers = {
  Query: {
    async me(_result, _parent, context) {
      const user = await context.userService.getUser()
      return user
    }
  }
}

export default resolvers
