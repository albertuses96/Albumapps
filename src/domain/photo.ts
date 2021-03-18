import {Photo  as PhotoDomain} from '../interface/driver/photoDriver'

export class Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  comment: string | null;
  constructor(photoData: PhotoDomain) {
    this.id = photoData.id
    this.albumId = photoData.albumId
    this.title = photoData.title
    this.url = photoData.url
    this.thumbnailUrl = photoData.thumbnailUrl
    this.comment = photoData.comment
  }
}