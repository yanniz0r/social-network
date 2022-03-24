import { beforeEach, describe, expect, it, vi } from 'vitest'
import AuthorizationService from './authorization-service'
import UserRepository, { UserModel } from '../repositories/user-repository'
import { ObjectId } from 'mongodb'

vi.mock('../repositories/user-repository')
// vi.mock('config')

describe('AuthorizationService', () => {
  let authorizationService: AuthorizationService
  let mockedRepository: UserRepository
  let user: UserModel

  beforeEach(() => {
    const userId = new ObjectId()
    user = {
      _id: userId,
      createdAt: new Date(),
      firstName: 'John',
      lastName: 'Doe',
    }
    mockedRepository = {
      findUser: vi.fn().mockResolvedValue(user)
    } as never
    authorizationService = new AuthorizationService(mockedRepository)
  })

  it ('creates valid tokens', async () => {
    const token = authorizationService.createAuthenticationToken(user._id)
    expect(token).toBeDefined()
    expect(() => authorizationService.ensureAuthorizedUser()).toThrowErrorMatchingInlineSnapshot('"User not authenticated"')
    await authorizationService.authenticateUser(token)
    expect(authorizationService.ensureAuthorizedUser()).toBe(user)
  })

})