import { Album } from "../../domain/album";

export interface AlbumUseCase {
  getAll(): Promise<Album[]>;
}
