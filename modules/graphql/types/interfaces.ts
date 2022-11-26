export interface User {
  id: string;
  username: string;
  thumbnail: string;
  createdOn: Date;
  recipeCount: number;
}

export interface Recipe {
  id: number;
  author: User;
  title: string;
  thumbnail: string;
  country: string;
  content: string;
  portions: string | number;
  cooking_time: string | number;
  isVegan: boolean;
  glutenFree: boolean;
  createdOn: Date;
  likes: number;
  likedByUser: boolean;
  isOwner: boolean;
}
