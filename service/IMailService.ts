import MailContent from '../model/mailcontent';

export interface IMailService {
    
    sendMailAsync(mailContent: MailContent): Promise<boolean>;
}
