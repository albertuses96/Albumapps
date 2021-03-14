import { Photo } from "../domain/photo";
import { PhotoUseCase } from "../interface/useCase/photoUseCase";
import PhotoRepository from "../repository/photoRepository";

export default class PhotoUseCaseImpl implements PhotoUseCase {
  readonly photoRepository: PhotoRepository;

  constructor(repository: PhotoRepository) {
    this.photoRepository = repository;
  }

  async getAll(): Promise<Photo[]> {
    return await this.photoRepository.getAll();
  }
}
