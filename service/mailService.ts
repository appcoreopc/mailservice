import nodemailer = require("nodemailer");
import MailContent from '../model/mailcontent';

interface SmtpServiceConfig
{
    host: String;
    port : number; 
    secure : boolean;
    username : String;
    password : String
}

interface IMailService
{
    sendMailAsync(mailContent : MailContent): Promise<boolean>;
}

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
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        console.log("setup smtp configuration and sending email" + testAccount.user);


        let info = await transporter.sendMail({
                from: '"jeremy" <foo@example.com>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log("Message sent: %s", info.messageId);

        return true;
    }
}

export default MailService;

// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();
  
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass, // generated ethereal password
//         },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"jeremy" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   console.log("Message sent: %s", info.messageId);

// }

//main().catch(console.error);

