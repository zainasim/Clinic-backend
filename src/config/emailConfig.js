import nodemailer from 'nodemailer';
import config from './config.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.user.GMAIL_USER,
        pass: config.user.GMAIL_PASSWORD,
    }
});

export default transporter;
