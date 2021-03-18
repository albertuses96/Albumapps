export default interface PhotoDriver {
  getAll(): Promise<Photo[]>;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  comment: string | null;
}
