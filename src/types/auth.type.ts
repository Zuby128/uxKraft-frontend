import type { UserRole } from "./enums.type";

export interface IUser {
  email: string;
  role: UserRole;
}

export interface ILoginBody {
  email: string;
  password: string;
}
