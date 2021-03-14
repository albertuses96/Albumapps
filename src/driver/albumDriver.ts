import AlbumDriver, {Album} from "../interface/driver/albumDriver";

export default class albumDriverImpl implements AlbumDriver {
  async getAll(): Promise<Album[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums`);
    return await res.json();
  }
}
