import { Logger } from "tslog";
import JWT from "jsonwebtoken";
import config from "config";
import UserRepository, { UserModel } from "../repositories/user-repository";
import { ObjectId } from "mongodb";
import { AuthenticationError } from "apollo-server-express";

const logger = new Logger({ name: "AuthorizationService" });

export default class AuthorizationService {
  private get jwtSecret() {
    return config.get<string>("Common.jwtSecret");
  }

  private authenticatedUser?: UserModel;

  constructor(private userRepository: UserRepository) {}

  createAuthenticationToken(userId: ObjectId) {
    return JWT.sign(
      {
        sub: userId,
      },
      this.jwtSecret
    );
  }

  async authenticateUser(jwt: string) {
    const decoded = JWT.verify(jwt, this.jwtSecret);
    if (typeof decoded === "string")
      throw new Error("JWT could not be decoded");
    const subject = decoded.sub;
    if (!subject) throw new Error("Subject not specified");
    const userId = new ObjectId(subject);
    const user = await this.userRepository.findUser(userId);
    if (!user) throw new Error("Unknown user");
    this.authenticatedUser = user;
  }

  ensureAuthorizedUser(): UserModel {
    const user = this.authenticatedUser;
    if (!user) throw new AuthenticationError("User not authenticated");
    return user;
  }
}
