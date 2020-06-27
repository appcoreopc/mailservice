import express = require('express');
import { Request, Response, NextFunction } from 'express';
import bodyParser = require('body-parser');
import MailSubjectModel from './model/mailcontent';
import MailService from './service/mailService';

const app = express()
const port = 3000
app.use(bodyParser.json());

app.get('/:id', async(req, res) => 
{   
    var params:any = req.params;
    res.send(`The given id status is as follows.`);
})

var smtpConfig = {
    username : "jeremy", 
    password : "passwordjeremy", 
    host : "smtp.ethereal.email", 
    secure : true, 
    port : 587
 };

let mailservice = new MailService(smtpConfig);

app.post('/send', async ( req: Request, 
    res: Response, next: NextFunction) =>  
{ 
    var mailBodyContent : MailSubjectModel = req.body;
    var result = await 
    mailservice.sendMailAsync(mailBodyContent);

    console.log("Email request completed.");
    res.send('status' + result);
})

app.listen(port, 
    () => console.log(`Mail service started on http://localhost:${port}`))
