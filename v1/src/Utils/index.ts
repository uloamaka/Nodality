import nodemailer from '../Services/nodemailer';
import { MAIL_USER } from './config';
import { IEmailProps } from './interface';

export const sendMail = (data: IEmailProps) => {
    return nodemailer.sendMail({
        from: data?.from || MAIL_USER,
        to: data?.to,
        subject: data?.subject,
        text: data?.text,
        html: data?.html,
        attachments: data?.attachments,
    });
};
