import { Album as AlbumDomain } from '../interface/driver/albumDriver'

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