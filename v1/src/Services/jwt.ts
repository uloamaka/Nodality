// import redis from './redis';
import 'dotenv/config';
import dayjs from 'dayjs';
import  jwt  from 'jsonwebtoken';
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    CLIENT_URL,
} from '../Utils/config';
import { BadRequestException } from '../Utils/service-error';
import { NextFunction } from 'express';

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets are not defined');
}


class JWTService {
  async generateToken(id: string) {
    const access_token = jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '20m',
      audience: 'API',
      issuer: 'SMS',
    });

    const refresh_token = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '30m',
      audience: 'API',
      issuer: 'SMS',
    });

    return {
      access_token,
      refresh_token,
      expires_at: dayjs().add(10, 'minutes').unix(),
    };
  }

  async verifyRefreshToken(token: string) {
    const decodedToken: any = await jwt.verify(token, REFRESH_TOKEN_SECRET);
    if (!decodedToken)
      throw new BadRequestException('Token is invalid or expired');

    return decodedToken;
  }

  async verifyAccessToken(token: string) {
    const decodedToken: any = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decodedToken)
      throw new BadRequestException('Token is invalid or expired');
    return decodedToken;
  }

  generateResetToken(userId: string, email: string, oldPassword: string) {
    const otpToken = ACCESS_TOKEN_SECRET + oldPassword;
    const resetToken = jwt.sign({ userId, email }, otpToken, {
      expiresIn: '1h',
    });
    const resetLink = `${CLIENT_URL}/reset-password/${userId}/${resetToken}`;
    return resetLink;
  }

  verifyResetToken( resetToken: string, oldPassword: string, next: NextFunction) {
    const otpToken = ACCESS_TOKEN_SECRET + oldPassword;
    const decodedToken = jwt.verify(resetToken, otpToken, function (err, decoded) {
     if (err){
        throw new BadRequestException(
          err.message
        )
      }
    });
    next()
  }
};

export default new JWTService();
