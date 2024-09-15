import { SessionOptions } from 'iron-session';

const SECRET_COOKIE_PASSWORD = process.env.SECRET_COOKIE_PASSWORD;

if (!SECRET_COOKIE_PASSWORD || SECRET_COOKIE_PASSWORD.length < 32) {
  throw new Error('SECRET_COOKIE_PASSWORD must be at least 32 characters long');
}

export const sessionOptions: SessionOptions = {
  password: SECRET_COOKIE_PASSWORD,
  cookieName: 'safebeautyledger-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export interface SessionData {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

declare module 'iron-session' {
  interface IronSessionData extends SessionData {}
}