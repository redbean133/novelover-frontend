import { jwtDecode } from "jwt-decode";
import type { UserRole } from "../constants/constants";

export interface IDecodedJwt {
  exp: number;
  sub: string;
  role: UserRole;
  username: string;
}

export const decodeJwt = (token: string): IDecodedJwt => {
  const decoded = jwtDecode<IDecodedJwt>(token);
  return decoded;
};

export const isTokenExpired = (token: string) => {
  const decoded = decodeJwt(token);
  const now = new Date().getTime();
  return decoded.exp < now;
};

export const getTokenExpiry = (token: string) => {
  const decoded = decodeJwt(token);
  return decoded.exp;
};

export const isChanged = (
  origin: Record<string, unknown>,
  update: Record<string, unknown>,
  compareKeys: string[]
): boolean => {
  return compareKeys.some((key) => {
    if (!(key in origin) || !(key in update)) {
      return false;
    }

    const originValue = origin[key];
    const updateValue = update[key];

    if (originValue !== updateValue) {
      console.log(key);
      return true;
    }

    return false;
  });
};
