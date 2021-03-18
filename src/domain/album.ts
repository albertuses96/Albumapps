import { Album as AlbumDomain } from '../interface/driver/albumDriver'
import { User } from '../interface/driver/userDriver'
import { Photo } from './photo';

export class Album {
  userId: number;
  id: number;
  title: string;

  constructor(albumData: AlbumDomain) {
    this.id = albumData.id
    this.userId = albumData.userId
    this.title = albumData.title
  }
}


export interface AlbumData extends Album {
 user: User
 photos: Photo[]
} 