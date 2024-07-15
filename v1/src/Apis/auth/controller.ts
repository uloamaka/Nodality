import { NextFunction, Request, Response } from 'express';
import Service from './service';
import BaseController from '../../Utils/base-controller';
import { StatusCodes } from 'http-status-codes';
import { z, ZodError } from 'zod';

const registerSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
export default class Controller extends BaseController {
    private service: Service;
    constructor() {
        super();
        this.service = new Service();
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            this.validateRequest(req);
            BaseController.validateRequest(req, registerSchema);
            
            const { message, data } = await this.service.register(req.body);

            res.cookie('jwt', data.access_token, {
                httpOnly: true,
                maxAge: 20 * 60 * 1000,
            });

            this.responsHandler(res, StatusCodes.OK, message, data);
        } catch (error: any) {
            BaseController.responsHandler(
                res,
                error.code,
                error.message,
                error.data
            );
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            this.validateRequest(req);
            BaseController.validateRequest(req, loginSchema);
            const { message, data } = await this.service.login(req.body);

            res.cookie('jwt', data.access_token, {
                httpOnly: true,
                maxAge: 20 * 60 * 1000,
            });

            this.responsHandler(res, StatusCodes.OK, message, data);
        } catch (error: any) {
            BaseController.responsHandler(
                res,
                error.code,
                error.message,
                error.data
            );
        }
    }
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            this.validateRequest(req);

            const { message } = await this.service.sendResetLink(req.body);

            this.responsHandler(res, StatusCodes.OK, message);
        } catch (error: any) {
            BaseController.responsHandler(
                res,
                error.code,
                error.message,
                error.data
            );
        }
    }
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            this.validateRequest(req);

            const { message } = await this.service.resetPass(
                req.body,
                req.params
            );

            this.responsHandler(res, StatusCodes.OK, message);
        } catch (error: any) {
            BaseController.responsHandler(
                res,
                error.code,
                error.message,
                error.data
            );
        }
    }
}
