import nodemailer = require("nodemailer");
import MailContent from '../model/mailcontent';
import { SmtpServiceConfig } from "./SmtpServiceConfig";
import Mail = require('nodemailer/lib/mailer');
import IMailTransport from './IMailTransport';

export default class CoreMailTransporter implements IMailTransport {

    private smtpConfig: SmtpServiceConfig;
    transporter: Mail;

    constructor(smtpConfig: SmtpServiceConfig) {
        this.smtpConfig = smtpConfig;
    }

    public async setup(): Promise<any> {

        let testAccount = await nodemailer.createTestAccount();

        this.smtpConfig.username = testAccount.user;
        this.smtpConfig.password = testAccount.pass;

        this.transporter = await nodemailer.createTransport({
            host: this.smtpConfig.host,
            port: this.smtpConfig.port,
            secure: this.smtpConfig.secure,
            auth: {
                user: this.smtpConfig.username,
                pass: this.smtpConfig.password,
            },
        });
    }


    async sendMailAsync(mailContent: MailContent): Promise<void> {

        return this.transporter.sendMail({
            from: '"jeremy" <foo@example.com>',
            to: "bar@example.com, baz@example.com",
            subject: mailContent.subject,
            text: mailContent.content,
            html: mailContent.content,
        });
    }
}
