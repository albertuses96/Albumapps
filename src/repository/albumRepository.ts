import AlbumRepository from "../interface/repository/albumRepository";
import AlbumDriver from "../interface/driver/albumDriver";
import { Album } from "../domain/album";

export default class AlbumRepositoryImpl implements AlbumRepository {
  private readonly albumDriver: AlbumDriver;

  constructor(albumDriver: AlbumDriver) {
    this.albumDriver = albumDriver;
  }

  async getAll(): Promise<Album[]> {
    const res = await this.albumDriver.getAll();
    return res.map(albumData => {
      return new Album(
        albumData
      )
    })
  }
}
