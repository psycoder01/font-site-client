export interface Font {
  id: string;
  ref: string;
  name: string;
  price: string;
  rating: string;
  thumbUrl: string;
  downloads: number;
  searchName: string;
  charMapUrl: string;
  description: string;
  type: 'free' | 'premium';
}
