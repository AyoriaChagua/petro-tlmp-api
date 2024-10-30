import { EMAIL_1_PASS, EMAIL_1_USER, EMAIL_2_PASS, EMAIL_2_USER, SMTP_HOST_GMAIL, SMTP_PORT_GMAIL } from "src/config/environments";
import { IEmailCredentials } from "src/shared/interfaces/email.interface";

export const emailCredentialsMap: Record<string, IEmailCredentials> = {
    'ADMIN': {
        user: EMAIL_1_USER,
        pass: EMAIL_1_PASS,
        host: SMTP_HOST_GMAIL,
        port: SMTP_PORT_GMAIL,
    },
    'ACHAGUA': {
        user: EMAIL_2_USER,
        pass: EMAIL_2_PASS,
        host: SMTP_HOST_GMAIL,
        port: SMTP_PORT_GMAIL,
    }
}