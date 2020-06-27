import Mail = require('nodemailer/lib/mailer');

export default interface IMailTransport {
    //createTransport(transport?: SMTPTransport | SMTPTransport.Options | string, defaults?: SMTPTransport.Options): Mail;
    sendMailAsync(option: Mail.Options): Promise<any>;
}
