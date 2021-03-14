import { Photo } from "../../domain/photo";

export default interface PhotoRepository {
  getAll(): Promise<Photo[]>;
}
