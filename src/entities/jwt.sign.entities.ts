import { ROLE } from "./role.entitites";

export interface JWTUserInfo {
  user_id: string;
  email: string;
  role: ROLE;
}
