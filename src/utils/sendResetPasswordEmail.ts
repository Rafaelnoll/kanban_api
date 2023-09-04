import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
const fromEmail = process.env.SENDGRID_EMAIL as string;
const templateId = process.env.RESET_PASSWORD_TEMPLATE_ID as string;

interface SendResetPasswordEmailData {
  emailTo: string;
  username: string;
  url_reset_password: string;
}

export async function sendResetPasswordEmail({
  emailTo,
  username,
  url_reset_password,
}: SendResetPasswordEmailData) {
  const msg = {
    to: emailTo,
    from: fromEmail,
    template_id: templateId,
    dynamic_template_data: {
      username,
      url_reset_password,
    },
  };

  return sgMail
    .send(msg as unknown as MailDataRequired)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
