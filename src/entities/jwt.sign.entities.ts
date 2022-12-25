import { ROLE } from "./role.entitites";

export interface JWTUserInfo {
  userId: string;
  role: ROLE;
}
