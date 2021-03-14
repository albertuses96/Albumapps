import PhotoDriver, {Photo} from "../interface/driver/photoDriver";

export default class photoDriverImpl implements PhotoDriver {
  async getAll(): Promise<Photo[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    return await res.json();
  }
}
