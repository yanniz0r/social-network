import { Resolvers } from "../generated";

const resolvers: Resolvers = {
  User: {
    id(parent) {
      return parent._id.toString()
    },
    name(parent) {
      return [parent.firstName, parent.lastName].join(' ')
    }
  },
  Query: {
    async me(_result, _parent, context) {
      const user = await context.userService.getUser()
      return user
    }
  }
}

export default resolvers
