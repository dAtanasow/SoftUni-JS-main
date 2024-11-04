import { Themes } from "./themes";
import { User } from "./user";

export interface Post {
  likes: [string];
  _id: string;
  text: string;
  userId: User;
  themeId: Themes;
  created_at: string;
  updatedAt: string;
  __v: number;
}
