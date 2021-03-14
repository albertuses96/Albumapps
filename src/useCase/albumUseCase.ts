import { Album } from "../domain/album";
import { AlbumUseCase } from "../interface/useCase/albumUseCase";
import AlbumRepository from "../repository/albumRepository";

export default class AlbumUseCaseImpl implements AlbumUseCase {
  readonly albumRepository: AlbumRepository;

  constructor(repository: AlbumRepository) {
    this.albumRepository = repository;
  }

  async getAll(): Promise<Album[]> {
    return await this.albumRepository.getAll();
  }
}
