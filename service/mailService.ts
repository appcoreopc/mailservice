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
  
        let transporter = nodemailer.createTransport({
            host: this.smtpConfig.host,
            port: this.smtpConfig.port,
            secure: this.smtpConfig.secure, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        console.log("setup smtp configuration and sending email" + testAccount.user);

        let info = await transporter.sendMail({
                from: '"jeremy" <foo@example.com>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: mailContent.subject, // Subject line
                text: mailContent.content, // plain text body
                html: mailContent.content, // html body
            });

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log("Message sent: %s", info.messageId);
        return true;
    }
}

export default MailService;