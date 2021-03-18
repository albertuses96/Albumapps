import { User } from "../domain/user";
import { UserUseCase } from "../interface/useCase/userUseCase";
import UserRepository from "../repository/userRepository";
import {search} from '../utils/fuzzySearch'

const searchOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ['name']
}


export default class UserUseCaseImpl implements UserUseCase {
  readonly userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  searchByUsername(query: string, users: User[]) {
    const result = search(query, users, searchOptions)
    return result.map((val) => {
      return {
        ...val.item,
        favorites: null
      }
    })
  }
}
