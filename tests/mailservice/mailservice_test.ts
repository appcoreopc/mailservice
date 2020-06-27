
import MailService from '../../service/MailService';
import Mail from "nodemailer/lib/mailer";
//jest.mock('../../service/IMailTransport');

describe('My Test Suite', () => {

   let fakeMailTransport = {
      sendMailAsync: jest.fn((options : Mail.Options):Promise<boolean> => Promise.resolve(false))
   };

   it('sendMailAsync successful', async () => {

      let mailContent = {
         title: "",
         subject: "",
         content: "",
         recipient: ["jeremy@hotmail.com"]
      }

      let target = new MailService(fakeMailTransport);
      var result = await target.sendMailAsync(mailContent);
      console.log(result);
      expect(fakeMailTransport.sendMailAsync.mock.calls.length).toEqual(1);

   });
});