
import MailService from '../../service/mailService';

describe('My Test Suite', () => {

   it('My Test Case', () => {
     
     let config = {
        host : "",
        password : "",
        username : "", 
        secure : false,
        port : 22
     };

     let mailContent = {
        title : "",
        subject : "", 
        content : "", 
        recipient : ["jeremy@hotmail.com"]
     }

     let target = new MailService(config);
     target.sendMailAsync(mailContent);


  });

  it('My Test Case', () => {
    expect(true).toEqual(true);

    //let mock = jest.mock({});
    //console.log(mock);

    expect(true).toEqual(true);
});
});