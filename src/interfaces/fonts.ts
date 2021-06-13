export interface Font {
  id: string;
  name: string;
  price: string;
  rating: number;
  language: string;
  downloads: number;
  thumbChars: string;
  searchName: string;
  description: string;
  oneStarCount: number;
  twoStarCount: number;
  fourStarCount: number;
  fiveStarCount: number;
  threeStarCount: number;
  type: 'free' | 'premium';
}
