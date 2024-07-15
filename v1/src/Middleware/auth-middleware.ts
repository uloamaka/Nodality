import { NextFunction } from 'express';
import jwt from '../Services/jwt';
import {UnauthorizedException} from '../Utils/service-error'

const userAuth = async (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const data = await jwt.verifyAccessToken(token);
            if (data && data.decodedToken) {
                req.user = {
                    id: data.decodedToken.id,
                };
                next();
            } else {
                return next(new UnauthorizedException('Invalid token'));
            }
        } catch (error) {
            return next(new UnauthorizedException('Token verification failed'));
        }
    } else {
        return next(new UnauthorizedException('No token provided'));
    }
};

export default userAuth;