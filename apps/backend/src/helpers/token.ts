import { sign, verify } from 'jsonwebtoken';

export type Payload = {
  uuid: string;
  vip: boolean;
  pseudo: string;
  emailVerified: boolean;
};

export const createAccessToken = (payload: Payload) => {
  return sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    // expiresIn: '5m', // FIX:
    expiresIn: '5m',
  });
};
export const createRefreshToken = (payload: Payload) => {
  return sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string, type: 'access' | 'refresh') => {
  return verify(
    token,
    type === 'access' ? process.env.ACCESS_TOKEN_SECRET! : process.env.REFRESH_TOKEN_SECRET!
  ) as Payload;
};
