import PhotoUseCase from '../../../useCase/photoUseCase'


export class PhotoViewModel {
  photoController: PhotoUseCase
  usePhotoStore: Function

  constructor(photoUseCase: PhotoUseCase, photoStore: Function) {
    this.photoController = photoUseCase
    this.usePhotoStore = photoStore
  }

  async getAll() {
    return this.photoController.getAll()
  }
}