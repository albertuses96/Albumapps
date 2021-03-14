import { Album } from "../../domain/album";

export default interface AlbumRepository {
  getAll(): Promise<Album[]>;
}
