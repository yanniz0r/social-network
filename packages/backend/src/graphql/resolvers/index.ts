import { Resolvers } from "../generated";


const resolvers: Resolvers = {
  Query: {
    test() {
      return 'Hello World 2!'
    }
  }
}

export default resolvers
