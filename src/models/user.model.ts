import { ROLE } from "../entities/role.entitites";

export interface User {
  role: ROLE;
  email: string;
  hashed_password: string;
}
