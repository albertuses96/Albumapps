import UserUseCase from '../../../useCase/userUseCase'


export class PhotoViewModel {
  albumController: UserUseCase
  useUserStore: Function

  constructor(userUseCase: UserUseCase, albumStore: Function) {
    this.albumController = userUseCase
    this.useUserStore = albumStore
  }

  async getAll() {
    return this.albumController.getAll()
  }
}