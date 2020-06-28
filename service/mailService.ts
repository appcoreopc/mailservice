import winston = require('winston');
import MailContent from '../model/mailcontent';
import { IMailService } from "./IMailService";
import IMailTransport from './IMailTransport';

class MailService implements IMailService {
    private mailTransport: IMailTransport;

    constructor(mailTransport: IMailTransport) {
        this.mailTransport = mailTransport;
    }

    public async sendMailAsync(mailContent: MailContent): Promise<boolean> {
        return this.mailTransport.sendMailAsync(mailContent);
    }
}

export default MailService;