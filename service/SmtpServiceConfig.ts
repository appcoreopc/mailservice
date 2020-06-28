export interface SmtpServiceConfig {
    host: string;
    port: number;
    secure: boolean;
    username: string;
    password: string;
}

export class SmtpConfig implements SmtpServiceConfig {
    host: string = "";
    port: number = 123;
    secure: boolean = false;
    username: string = "";
    password: string = "";
}
