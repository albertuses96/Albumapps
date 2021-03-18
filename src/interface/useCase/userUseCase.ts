import { User } from "../../domain/user";

export interface UserUseCase {
  getAll(): Promise<User[]>;
  searchByUsername(query: string, users: User[]): User[];
}
