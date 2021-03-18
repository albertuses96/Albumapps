import { Album, AlbumData } from "../../domain/album";
import { Photo } from "../../domain/photo";
import { User } from "../../domain/user";

export interface AlbumUseCase {
  getAll(users: User[], photos: Photo[]): Promise<AlbumData[]>;
  searchByAlbumsName(query: string, list: Album[]): Album[];
  searchByUserName(user: User[], list: Album[]): Album[]
}
