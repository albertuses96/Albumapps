import { Album, AlbumData} from "../domain/album";
import { User } from "../domain/user";
import { AlbumUseCase } from "../interface/useCase/albumUseCase";
import AlbumRepository from "../repository/albumRepository";
import {search} from '../utils/fuzzySearch'
import { List } from 'linqts';
import { Photo } from "../domain/photo";

const searchOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ['title']
}

export default class AlbumUseCaseImpl implements AlbumUseCase {
  readonly albumRepository: AlbumRepository;

  constructor(repository: AlbumRepository) {
    this.albumRepository = repository;
  }

  async getAll(users: User[], photos: Photo[]): Promise<AlbumData[]> {
    const albums = await this.albumRepository.getAll();
    const albumList = new List<Album>(albums)
    const userList = new List<User>(users)
    const photoList = new List<Photo>(photos)
    const firsQuery = albumList.Join
      (userList,
      album => album.userId,
      user => user.id,
      (album, user) =>
        (
          { 
            ...album, 
            user: {
              ...user,
              favorites: null
            }, 
            photos: photoList.Where((photo: any) => photo.albumId === album.id).ToArray() 
          }
        )
    );

    return firsQuery.ToArray()
  }

  searchByAlbumsName(query: string, albums: Album[]) {
    const result = search(query, albums, searchOptions)
    return result.map((val) => {
      return {
        ...val.item
      }
    })
  } 

  searchByUserName(users: User[], albums: Album[]) {
    const albumList = new List<Album>(albums)
    const userList = new List<User>(users)
    const query = albumList.Join(userList,
      album => album.userId,
      user => user.id,
      (album) =>
        ({ ...album }));
    return query.ToArray()
  } 
}
