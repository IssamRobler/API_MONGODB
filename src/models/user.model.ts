import { ROLE } from "../entities/role.entitites";

export interface User {
  role: ROLE;
  userId: string;
  email: string;
  hashed_password: string;
}
type NotInReadOnly = "hashed_password";
export type UserProfile = Omit<User, NotInReadOnly>;
