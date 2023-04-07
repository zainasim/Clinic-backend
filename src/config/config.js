import ckey from 'ckey';

const MONGO_URL = ckey.MONGO_URL;

const SERVER_PORT = ckey.SERVER_PORT;

const config = {
    server: {
        port: SERVER_PORT
    },
    user: {
        GMAIL_USER: 'zainasim222@gmail.com',
        GMAIL_PASSWORD: 'jbncszhdokrnwjue',
    },
    salt: {
        number: 10
    },
    mongo: {
        url: MONGO_URL
    },
    token: {
        accessTokenTtl: '1m',
        refreashTokenTtl: '1y'
    },
    key: {
        privateKey: 'secret',
    },
    emailService: {
        host: ckey.EMAIL_HOST,
        port: ckey.EMAIL_SMTP_PORT,
        secure: ckey.EMAIL_SECURE,
        service: ckey.EMAIL_SERVICE,
        auth: {
            user: ckey.EMAIL_USER,
            pass: ckey.EMAIL_PASSWORD,
        },
    }
};

export default config;
