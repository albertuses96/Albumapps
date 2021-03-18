import { User } from '../../../domain/user'
import UserUseCase from '../../../useCase/userUseCase'


export class UserViewModel {
  userController: UserUseCase
  useUserStore: Function

  constructor(userUseCase: UserUseCase, albumStore: Function) {
    this.userController = userUseCase
    this.useUserStore = albumStore
  }

  async getAll() {
    return this.userController.getAll()
  }

  searchByUsername(query: string, users: User[]) {
    return this.userController.searchByUsername(query, users)
  }
}