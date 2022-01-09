import { Client as MinioClient } from "minio";
import { MongoClient } from "mongodb";
import { Logger } from "tslog";
import PostRepository from "./repositories/post-repository";
import UserRepository from "./repositories/user-repository";
import AuthorizationService from "./services/authorization-service";
import PostService from "./services/post-service";
import FileStorageService from "./services/file-storage-service";
import UserService from "./services/user-service";

const logger = new Logger({ name: "Context" });

const MONGODB_NAME = "social";

export class Context {
  constructor(
    public userService: UserService,
    public postService: PostService,
    public authorizationService: AuthorizationService,
    public fileStorageService: FileStorageService
  ) {}

  static async init(): Promise<Context> {
    const db = await Context.initMongodb();
    const minio = Context.initMinio();

    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository);
    const authorizationService = new AuthorizationService(userRepository);

    const fileStorageService = new FileStorageService(minio);
    const postRepository = new PostRepository(db);
    const postService = new PostService(postRepository, fileStorageService);

    const context = new Context(
      userService,
      postService,
      authorizationService,
      fileStorageService
    );

    // TODO add this back in once this is cached
    // logger.info('Context initialized')

    return context;
  }

  static async initMongodb() {
    const mongoClient = new MongoClient(
      "mongodb://root:example@localhost:27017"
    );
    await mongoClient.connect();

    const db = mongoClient.db(MONGODB_NAME);

    return db;
  }

  static initMinio() {
    const minioClient = new MinioClient({
      endPoint: "localhost",
      port: 9000,
      useSSL: false,
      accessKey: "Q3AM3UQ867SPQQA43P2F",
      secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
    });
    return minioClient;
  }
}
