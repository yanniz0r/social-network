import { QueryResolvers } from "../../generated"

const authenticationQueryResolvers: QueryResolvers = {
  authenticateWith() {
    return {
      google: {
        url: 'test.de'
      }
    }
  }
}