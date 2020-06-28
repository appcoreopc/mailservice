import MailService from '../../service/MailService';
import Mail from "nodemailer/lib/mailer";
import nodemailer = require("nodemailer");
import CoreMailTransporter from '../../service/CoreMailTransporter';
import { SmtpConfig } from '../../service/SmtpServiceConfig';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

jest.mock('nodemailer');

describe('CoreMailTransporter Test Suite', () => {

    beforeEach(() => {

    });

    it('setup is successful', async () => {

        var transport = {
            user: "fakeuser",
            pass: "fakepassword",
            smtp: { host: "stmp-relay.google.com", port: 90, secure: true },
            imap: { host: "string", port: 90, secure: true },
            pop3: { host: "string", port: 90, secure: true },
            web: "http://"
        }

        let mailTransport = new SMTPTransport("stmp-relay.google.com");
        let mailInstance = new Mail(mailTransport);
        
        let mockCreateTransport = jest.fn().mockReturnValue(mailInstance);
        let mockCreateTestAccount = jest.fn().mockResolvedValue(Promise.resolve(transport));

        nodemailer.createTransport = mockCreateTransport;
        nodemailer.createTestAccount = mockCreateTestAccount;

        let cfg = {
            host: "",
            port: 900,
            secure: true,
            username: "string",
            password: "string",
        }

        let ms = new CoreMailTransporter(cfg);
        await ms.setupAsync();
        expect(mockCreateTestAccount).toHaveBeenCalled();
    });
    
});