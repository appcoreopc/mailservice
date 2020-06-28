
import MailService from '../../service/MailService';
import Mail from "nodemailer/lib/mailer";
import nodemailer = require("nodemailer");
import CoreMailTransporter from '../../service/CoreMailTransporter';
import { SmtpConfig } from '../../service/SmtpServiceConfig';
import SMTPTransport = require('nodemailer/lib/smtp-transport');
//const nodemailer = require("nodemailer");

jest.mock('nodemailer');

describe('CoreMailTransporter Test Suite', () => {

    beforeEach(() => {

    });

    it('setup ok ', async () => {


        var ta = {
            user: "string",
            pass: "string",
            smtp: { host: "string", port: 90, secure: true },
            imap: { host: "string", port: 90, secure: true },
            pop3: { host: "string", port: 90, secure: true },
            web: "string"
        }

        let mockCreateTestAccount = jest.fn().mockResolvedValue(Promise.resolve(ta));

        let tra = new SMTPTransport("");
        let m = new Mail(tra);

        let mockCreateTransport = jest.fn().mockReturnValue(m);

        nodemailer.createTestAccount = mockCreateTestAccount;
        nodemailer.createTransport = mockCreateTransport;

        let cfg = {
            host: "",
            port: 900,
            secure: true,
            username: "string",
            password: "string",
        }

        let ms = new CoreMailTransporter(cfg);
        ms.setup();

        console.log(mockCreateTestAccount.mock.calls.length);
        console.log(mockCreateTransport.mock.calls.length);

        //expect(nodemailer)
        //expect(sendMailMock).not.toHaveBeenCalled();

    });
});