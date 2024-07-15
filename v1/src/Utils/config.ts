import 'dotenv/config';

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const NODE_ENV = process.env.NODE_ENV as string;

export const PORT = process.env.PORT as string;

export const OTP_SECRET = process.env.OTP_SECRET as string;

export const MONGODB_URL = process.env.MONGODB_URL as string;
export const LOCAL_DB = process.env.LOCAL_DB as string;

export const MAIL_USER = process.env.MAIL_USER as string;
export const MAIL_PASS = process.env.MAIL_PASS as string;
export const MAIL_HOST = process.env.MAIL_HOST as string;
export const MAIL_PORT = process.env.MAIL_PORT as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;
export const MAIL_SERVICE: 'gmail' | 'smtp' = 'gmail';


