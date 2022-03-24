import { ObjectId } from "mongodb";
import { beforeEach, describe, it, vi } from "vitest";
import UserRepository, { UserModel } from "../repositories/user-repository";
import FileStorageService from "./file-storage-service";
import UserService from './user-service'

vi.mock('./file-storage-service')
vi.mock('../repositories/user-repository')

describe('UserService', () => {
  let userService: UserService
  let fileStorageService: FileStorageService
  let userRepository: UserRepository
  let user: UserModel

  beforeEach(() => { 
    user = {
      _id: new ObjectId(),
      createdAt: new Date(),
      firstName: 'John',
      lastName: 'Doe',
    }
    userRepository = vi.mocked(UserRepository.prototype)
    fileStorageService = vi.mocked(FileStorageService.prototype)
    userService = new UserService(userRepository, fileStorageService)
  })

  it ('get', () => {
    userService.getFriendRecommendations(user._id)
  })

})