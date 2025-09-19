import { jwtDecode } from "jwt-decode";
import type { UserRole } from "../constants/constants";
import { trim } from "lodash";

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
      return true;
    }

    return false;
  });
};

export const cleanWhitespace = (text: string): string => {
  return trim(text).replace(/\s+/g, " ");
};

export const startCase = (text: string): string => {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
