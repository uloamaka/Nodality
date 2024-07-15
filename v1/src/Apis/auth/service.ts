import {
    BadRequestException,
    NotFoundException,
} from '../../Utils/service-error';
import { User } from '../../Model/user';
import bcrypt from 'bcrypt';
import { authPayload, otpPayload, resetPayload } from './interface';
import jwt from '../../Services/jwt';
import { resetPassMail, confirmReset } from '../../Utils/email-templates';
import { sendMail } from '../../Utils';

export default class Service {
    async register(payload: authPayload) {
        try {
            const { email, password } = payload;
            const userExist = await User.findOne({ email });
            if (userExist) {
                throw new BadRequestException('Email already exists');
            }
            const hash = bcrypt.hashSync(password, 10);
            const user = await User.create({
                email,
                password: hash,
            });

            const data = await jwt.generateToken(user.id);
            return {
                message: 'Registeration successful!',
                data,
            };
        } catch (error) {
            throw error;
        }
    }

    async login(payload: authPayload) {
        try {
            const { email, password } = payload;
            const user = await User.findOne({ email });
            if (!user) throw new NotFoundException('User not found');

            const is_valid = await bcrypt.compare(password, user.password);
            if (!is_valid) throw new BadRequestException('Incorrect email or password!');

            const data = await jwt.generateToken(user.id);

            return {
                message: 'Login successful!',
                data,
            };
        } catch (error) {
            throw error;
        }
    }

    async sendResetLink(payload: otpPayload) {
        try {
            const { email } = payload;
            const user = await User.findOne({ email });
            if (!user) {
                throw new NotFoundException('User not found!');
            }
            const resetLink =  jwt.generateResetToken(
                user.id,
                user.email,
                user.password
            );
            await sendMail({
                to: user.email,
                subject: 'Password Reset Link',
                html: resetPassMail(resetLink),
            });
            return {
                message: 'Password Reset Link sent successfully!',
            };
        } catch (error) {
            throw error;
        }
    }

    async resetPass(payload: resetPayload, req_params: any) {
        try {
            const { resetToken, userId } = req_params;
            const { new_password } = payload;
            const user = await User.findOne({ _id: userId });
            if (!user) {
                throw new NotFoundException('User not found!');
            }
            jwt.verifyResetToken(resetToken, user.password, (err: any) => {
                if (err) {
                    throw new BadRequestException(err.message);
                }
            });
            const hashedPassword = await bcrypt.hash(new_password, 10);
            await User.updateOne(
                { _id: userId },
                { password: hashedPassword },
                {
                    new: true,
                }
            );
            await sendMail({
                to: user.email,
                subject: 'Password Reset Successful',
                html: confirmReset(),
            });
            return {
                message: 'Password Reset successful!',
            };
        } catch (error) {
            throw error;
        }
    }
}
