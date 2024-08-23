import * as dotenv from 'dotenv';
dotenv.config();

const SECRETKEY_JWT = process.env.SECRETKEY_JWT || "test-secret";
const DB_SOURCE = process.env.DB_SOURCE || "";
const DB_NAME = process.env.DB_NAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_USER = process.env.DB_USER || "";
const PORT = process.env.PORT || 4500;
const API_KEY_RESEND =  process.env.API_KEY_RESEND || "test-api-key";
const EMAIL_ADRIAN = process.env.EMAIL_ADRIAN || "test@email.com";
const PASS_ADRIAN = process.env.PASS_ADRIAN || "passExample123";

export {
    SECRETKEY_JWT,
    DB_SOURCE,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    PORT,
    API_KEY_RESEND,
    EMAIL_ADRIAN,
    PASS_ADRIAN
};
