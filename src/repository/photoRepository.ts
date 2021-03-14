import PhotoRepository from "../interface/repository/photoRepository";
import PhotoDriver from "../interface/driver/photoDriver";
import { Photo } from "../domain/photo";

export default class PhotoRepositoryImpl implements PhotoRepository {
  private readonly photoDriver: PhotoDriver;

  constructor(photoDriver: PhotoDriver) {
    this.photoDriver = photoDriver;
  }

  async getAll(): Promise<Photo[]> {
    const res = await this.photoDriver.getAll();
    return res.map(photoData => {
      return new Photo(
        photoData
      )
    })
  }
}
