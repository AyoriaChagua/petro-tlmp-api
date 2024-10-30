import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.email' });

const SECRETKEY_JWT = process.env.SECRETKEY_JWT || "test-secret";
const DB_SOURCE = process.env.DB_SOURCE || "";
const DB_NAME = process.env.DB_NAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_USER = process.env.DB_USER || "";
const PORT = process.env.PORT || 4500;
const API_KEY_RESEND = process.env.API_KEY_RESEND || "test-api-key";

const SMTP_HOST_GMAIL = process.env.SMTP_HOST_GMAIL || '';
const SMTP_PORT_GMAIL = Number(process.env.SMTP_PORT_GMAIL) || 587;

const SMTP_HOST_OUTLOOK = process.env.SMTP_HOST_OUTLOOK || '';
const SMTP_PORT_OUTLOOK = Number(process.env.SMTP_PORT_OUTLOOK) || 587;

const EMAIL_1_USER = process.env.EMAIL_1_USER || '';
const EMAIL_1_PASS = process.env.EMAIL_1_PASS || '';
const EMAIL_2_USER = process.env.EMAIL_2_USER || '';
const EMAIL_2_PASS = process.env.EMAIL_2_PASS || '';

if (!SECRETKEY_JWT || !DB_SOURCE || !DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new Error("Missing required environment variables for database configuration");
}


export {
    SECRETKEY_JWT,
    DB_SOURCE,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    PORT,
    API_KEY_RESEND,
    SMTP_HOST_GMAIL,
    SMTP_PORT_GMAIL,
    SMTP_HOST_OUTLOOK,
    SMTP_PORT_OUTLOOK,
    EMAIL_1_USER,
    EMAIL_1_PASS,
    EMAIL_2_USER,
    EMAIL_2_PASS,
};
