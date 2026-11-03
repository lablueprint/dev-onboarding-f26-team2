export type Review = {
  id: string;
  movieId: string;
  author: string;
  rating: number; // 1-5
  text: string;
  createdAt: string; // ISO date string
};
