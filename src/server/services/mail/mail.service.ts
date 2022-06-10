import Mail from 'nodemailer/lib/mailer';
import transporter from '../../../config/smtp.config';

class MailService {
  public sendMail = async (mailOptions: Mail.Options) => {
    if (process.env.NODE_ENV !== 'production')
      transporter.sendMail(mailOptions);
  };
}

export default MailService;
