import { Transporter, createTransport } from 'nodemailer';

type SendEmailInput = {
  to: string;
  subject: string;
  body: string;
};

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  async sendEmail({ to, subject, body }: SendEmailInput) {
    return this.transporter.sendMail({
      from: 'no-reply@cryptoinvest.com.br',
      to,
      subject,
      html: `
        <div>
          <h1>${subject}</h1>
          <p>${body}</p>
        </div>
      `,
    });
  }
}
