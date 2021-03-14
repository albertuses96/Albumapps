import AlbumUseCase from '../../../useCase/albumUseCase'

export class AlbimViewModel {
  albumController: AlbumUseCase
  useAlbumStore: Function

  constructor(albumUseCase: AlbumUseCase, albumStore: Function) {
    this.albumController = albumUseCase
    this.useAlbumStore = albumStore
  }

  async getAll() {
    return this.albumController.getAll()
  }
}