import { Attachment } from "nodemailer/lib/mailer";

export interface IEmailProps {
    from?: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    attachments?: Attachment[]
}