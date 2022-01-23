import { Upload } from "graphql-upload";
import { ObjectId } from "mongodb";
import { Logger } from "tslog";
import * as uuid from "uuid";
import { ImagePostInput, TextPostInput } from "../graphql/generated";
import PostRepository, {
  PostInput,
  PostModel,
} from "../repositories/post-repository";
import { UserModel } from "../repositories/user-repository";
import Post from "../types/post";
import initObjectID from "../utils/init-object-id";
import FileStorageService from "./file-storage-service";

const logger = new Logger({ name: "PostService" });

export default class PostService {
  constructor(
    private postRepository: PostRepository,
    private fileStorageService: FileStorageService
  ) {}

  async getPostsFrom(user: Array<UserModel>): Promise<PostModel[]> {
    const posts = await this.postRepository.findAllByUser(
      user.map(user => user._id)
    );
    return posts;
  }

  async createTextPost(user: UserModel, input: TextPostInput) {
    const post: Post = {
      type: "text",
      text: input.text,
      comments: [],
      createdAt: new Date(),
      likedBy: [],
      userID: user._id,
    };
    const insertedId = await this.postRepository.createPost(post);
    return {
      ...post,
      _id: insertedId,
    };
  }

  async createImagePost(
    user: UserModel,
    input: ImagePostInput
  ): Promise<PostModel> {
    const upload = input.file as Upload;
    const file = await upload;
    const stream = file.createReadStream();

    const filename = uuid.v4();

    await this.fileStorageService.uploadStream("image-post", filename, stream);
    const post: Post = {
      type: "image",
      text: input.text ?? undefined,
      image: filename,
      comments: [],
      createdAt: new Date(),
      likedBy: [],
      userID: user._id,
    };
    const insertedId = await this.postRepository.createPost(post);
    return {
      ...post,
      _id: insertedId,
    };
  }

  async getPostByID(id: string | ObjectId) {
    return this.postRepository.findPostById(initObjectID(id));
  }

  async likePost(user: UserModel, post: PostModel) {
    return this.postRepository.addUserToLikedBy(user._id, post._id);
  }

  async unlikePost(user: UserModel, post: PostModel) {
    return this.postRepository.removeUserFromLikedBy(user._id, post._id);
  }

  async commentPost(userID: ObjectId, postID: ObjectId, text: string) {
    await this.postRepository.commentPost(postID, {
      userID,
      text,
    });
  }
}
