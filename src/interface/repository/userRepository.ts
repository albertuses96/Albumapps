import { User } from "../../domain/user";

export default interface UserRepository {
  getAll(): Promise<User[]>;
}
