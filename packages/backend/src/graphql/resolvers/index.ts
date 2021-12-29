import { Resolvers } from "../generated";

const resolvers: Resolvers = {
  Post: {
    __resolveType(post) {
      switch (post.type) {
        case 'text':
          return 'TextPost'
      }
    }
  },
  User: {
    id(parent) {
      return parent._id.toString()
    },
    name(parent) {
      return [parent.firstName, parent.lastName].join(' ')
    }
  },
  TextPost: {
    async user(textPost, _result, context) {
      const user = await context.userService.findUser(textPost.userID)
      return user!
    }
  },
  Query: {
    async me(_parent, _result, context) {
      const user = await context.userService.getUser()
      return user
    },
    async posts(_parent, _result, context) {
      return context.postService.getPosts()
    }
  }
}

export default resolvers
