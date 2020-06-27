import express = require('express');
import winston = require('winston');
import bodyParser = require('body-parser');
import nodemailer = require("nodemailer");

import { Request, Response, NextFunction } from 'express';
import MailSubjectModel from './model/mailcontent';
import MailService, { CoreMailTransporter } from './service/mailService';

const app = express()
const port = 3000
app.use(bodyParser.json());

var smtpConfig = {
    username: "jeremy",
    password: "password",
    host: "smtp.ethereal.email",
    secure: false,
    port: 587
};

let transporter = new CoreMailTransporter(smtpConfig);
transporter.setup();
let mailservice = new MailService(transporter);

app.get('/:id', async (req, res) => {
    var params: any = req.params;
    winston.info('serving up email query :' + params.id);
    res.setHeader('Content-Type', 'application/json');
    res.json({ id: params.id });
})

app.post('/send', async (req: Request,
    res: Response, next: NextFunction) => {
    var mailBodyContent: MailSubjectModel = req.body;
    var result = await
        mailservice.sendMailAsync(mailBodyContent);

    winston.info("Email request completed.");
    res.send('status' + result);
})

app.listen(port,
    () => winston.info(`Mail service started on http://localhost:${port}`))
