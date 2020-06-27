import winston = require('winston');
import nodemailer = require("nodemailer");
import MailContent from '../model/mailcontent';
import { SmtpServiceConfig } from "./SmtpServiceConfig";
import { IMailService } from "./IMailService";

class MailService implements IMailService
{
    private smtpConfig: SmtpServiceConfig;

    constructor(smtpConfig : SmtpServiceConfig)
    {
        this.smtpConfig = smtpConfig; 
    }

    public async sendMailAsync(mailContent: MailContent): Promise<boolean> 
    {
        let testAccount = await nodemailer.createTestAccount();

        this.smtpConfig.username = testAccount.user;
        this.smtpConfig.password = testAccount.pass;

        let transporter = await nodemailer.createTransport({
            host: this.smtpConfig.host,
            port: this.smtpConfig.port,
            secure: this.smtpConfig.secure, 
            auth: {
                user: this.smtpConfig.username, 
                pass: this.smtpConfig.password, 
            },
        });

        winston.info("setup smtp configuration and sending email" + testAccount.user);

        let info = await transporter.sendMail({
                from: '"jeremy" <foo@example.com>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: mailContent.subject, // Subject line
                text: mailContent.content, // plain text body
                html: mailContent.content, // html body
            });

           winston.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
           winston.info("Message sent: %s", info.messageId);

        return true;
    }
}

export default MailService;