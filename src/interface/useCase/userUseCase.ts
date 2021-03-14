import { User } from "../../domain/user";

export interface PhotoUseCase {
  getAll(): Promise<User[]>;
}
