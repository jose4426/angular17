import { Resend } from 'resend';

const resend = new Resend('re_fJzuY4F7_LY2wkW9Rm7m8yA1g3f9Aq5ZG');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'gonzalezjar231@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});