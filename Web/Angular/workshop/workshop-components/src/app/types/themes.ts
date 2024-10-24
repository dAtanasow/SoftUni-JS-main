import { Post } from "./posts";
import { User } from "./user";

export interface Themes {
  subscribers: [string];
  posts: Post[];
  _id: string;
  themeName: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}
