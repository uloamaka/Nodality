// import nodemailer from "nodemailer"
import * as nodemailer from 'nodemailer';
import {
    MAIL_HOST,
    MAIL_PASS,
    MAIL_PORT,
    MAIL_SERVICE,
    MAIL_USER,
} from '../Utils/config';

const config = {
    smtp: {
        host: MAIL_HOST,
        port: parseInt(MAIL_PORT),
        secure: true,
    },
    gmail: {
        service: 'gmail',
        tls: { rejectUnauthorized: false },
    },
};

export default nodemailer.createTransport({
    ...config[MAIL_SERVICE],
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
});
