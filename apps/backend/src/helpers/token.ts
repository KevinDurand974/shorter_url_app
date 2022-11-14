import { sign } from 'jsonwebtoken';

type Payload = string | object | Buffer;

export const createAccessToken = (payload: Payload) => {
  return sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    // expiresIn: '5m',
    expiresIn: '1m',
  });
};
export const createRefreshToken = (payload: Payload) => {
  return sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '30d',
  });
};
