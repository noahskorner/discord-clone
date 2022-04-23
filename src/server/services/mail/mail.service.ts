import Mail from 'nodemailer/lib/mailer';
import { env } from 'process';
import transporter from '../../../config/smtp.config';

class MailService {
  public sendMail = async (mailOptions: Mail.Options) => {
    if (env.NODE_ENV !== 'test') transporter.sendMail(mailOptions);
  };
}

export default MailService;
