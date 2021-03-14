import { Photo } from "../../domain/photo";

export interface PhotoUseCase {
  getAll(): Promise<Photo[]>;
}
