export interface Font {
  id: string;
  ref: string;
  name: string;
  price: string;
  rating: number;
  thumbUrl: string;
  language: string;
  downloads: number;
  searchName: string;
  charMapUrl: string;
  description: string;
  oneStarCount: number;
  twoStarCount: number;
  fourStarCount: number;
  fiveStarCount: number;
  threeStarCount: number;
  type: 'free' | 'premium';
}
