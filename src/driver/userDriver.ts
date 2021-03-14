import UserDriver, {User} from "../interface/driver/userDriver";

export default class userDriverImpl implements UserDriver {
  async getAll(): Promise<User[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return await res.json();
  }
}
