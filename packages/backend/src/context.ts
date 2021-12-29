import { MongoClient } from "mongodb";
import { Logger } from "tslog";
import PostRepository from "./repositories/post-repository";
import UserRepository from "./repositories/user-repository";
import PostService from "./services/post-service";
import UserService from "./services/user-service";

const logger = new Logger({ name: 'Context' })

const MONGODB_NAME = 'social'

export class Context {

  constructor(
    public userService: UserService,
    public postService: PostService,
  ) {}

  static async init(): Promise<Context> {
    const mongoClient = new MongoClient('mongodb://root:example@localhost:27017')
    await mongoClient.connect()

    const db = mongoClient.db(MONGODB_NAME)

    const userRepository = new UserRepository(db)
    const userService = new UserService(userRepository)
    
    const postRepository = new PostRepository(db)
    const postService = new PostService(postRepository)

    const context = new Context(
      userService,
      postService,
    )

    // TODO add this back in once this is cached
    // logger.info('Context initialized')

    return context
  }

}
