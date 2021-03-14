export default interface AlbumDriver {
  getAll(): Promise<Album[]>;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}
