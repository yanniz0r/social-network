import { Client as MinioClient } from "minio";
import { MongoClient } from "mongodb";
import { Logger } from "tslog";
import PostRepository from "./repositories/post-repository";
import UserRepository from "./repositories/user-repository";
import AuthorizationService from "./services/authorization-service";
import PostService from "./services/post-service";
import FileStorageService from "./services/file-storage-service";
import UserService from "./services/user-service";
import config from "config";
import { Request, Response } from "express";

const logger = new Logger({ name: "Context" });

const MONGODB_NAME = "social";

export class Context {
  constructor(
    public userService: UserService,
    public postService: PostService,
    public authorizationService: AuthorizationService,
    public fileStorageService: FileStorageService,
    private request?: Request,
    private response?: Response
  ) {}

  static async init(request: Request, response: Response): Promise<Context> {
    const db = await Context.initMongodb();
    const minio = Context.initMinio();

    const fileStorageService = new FileStorageService(minio);

    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository, fileStorageService);
    const authorizationService = new AuthorizationService(userRepository);

    const postRepository = new PostRepository(db);
    const postService = new PostService(postRepository, fileStorageService);

    const context = new Context(
      userService,
      postService,
      authorizationService,
      fileStorageService,
      request,
      response
    );

    // TODO add this back in once this is cached
    // logger.info('Context initialized')

    return context;
  }

  static async initMongodb() {
    const mongoClient = new MongoClient(config.get<string>("MongoDB.url"));
    await mongoClient.connect();

    const db = mongoClient.db(MONGODB_NAME);

    return db;
  }

  static initMinio() {
    const minioClient = new MinioClient(config.get("MinIO"));
    return minioClient;
  }

  getCookie(name: string) {
    if (!this.request)
      throw new Error("A request has to be set to use cookies");
    return this.request.cookies[name];
  }

  setCookie(name: string, value: string) {
    if (!this.response)
      throw new Error("A response has to be set to use cookies");
    this.response.cookie(name, value, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });
  }
}
