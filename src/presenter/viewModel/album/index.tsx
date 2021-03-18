import AlbumUseCase from '../../../useCase/albumUseCase'
import {Album} from '../../../domain/album'
import {User} from '../../../domain/user'
import { Photo } from '../../../domain/photo'

export class AlbumViewModel {
  albumController: AlbumUseCase
  useAlbumStore: Function

  constructor(albumUseCase: AlbumUseCase, albumStore: Function) {
    this.albumController = albumUseCase
    this.useAlbumStore = albumStore
  }

  async getAll(users: User[], photos: Photo[]) {
    return this.albumController.getAll(users, photos)
  }

  searchByAlbumsName(query: string, albums: Album[]) {
    return this.albumController.searchByAlbumsName(query, albums)
  } 

  searchByUserName(users: User[], albums: Album[]) {
    return this.albumController.searchByUserName(users, albums)
  } 
}