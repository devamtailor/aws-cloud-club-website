import { JwtPayload } from "jsonwebtoken";

export interface AuthUser {
  id: string;
  email: string;
}

export interface TokenPayload extends JwtPayload {
  sub: string;
  email: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  admin: AuthUser;
}
