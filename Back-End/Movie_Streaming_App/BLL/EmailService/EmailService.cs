using System.Net;
using System.Net.Mail;

namespace BLL.EmailService
{
    public class EmailService : IEmailService
    {
        public void SendEmail(Email email, string username)
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress("doctordotnet62@gmail.com", "Doc Net");
            message.To.Add(email.To);
            message.IsBodyHtml = true;
            message.Subject = email.Subject;
            if (email.Template == MailTemplates.ConfirmEmailTemplate)
                message.Body = $"<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Email Confirmation</title><style>body{{font-family:Arial,sans-serif;background-color:#f4f4f7;margin:0;padding:0}}.container{{max-width:600px;margin:auto;background:#ffffff;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1)}}.header{{padding-bottom:20px}}.header img{{width:150px}}.button{{background-color:#007BFF;color:white !important;padding:12px 20px;text-decoration:none;border-radius:5px;display:inline-block;margin-top:20px}}.footer{{text-align:center;font-size:12px;color:#888;margin-top:20px}}</style></head><body><div class=\"container\"><div class=\"header\"><img src=\"https://i.ibb.co/gZjcQ1BG/Whats-App-Image-2025-04-21-at-13-21-33-cf3c447e.jpg\" alt=\"DocNet Logo\"></div><h2>Email Confirmation</h2><p>Hello {username},</p><p>Thank you for signing up with <strong>DocNet</strong>. To complete your registration and start using our services, please verify your email address by clicking the confirmation button below. This helps us ensure the security of your account and enables you to access all features without any interruptions. The process is quick and only takes a moment.</p><a href=\"{email.Link}\" class=\"button\">Confirm Email</a><p>If you did not create this account or believe this message was sent to you by mistake, please disregard this email. No further action will be taken without your confirmation.</p><div class=\"footer\">&copy; 2025 ITI Student Team. All rights reserved.</div></div></body></html>\r\n";
            else
                message.Body = $"<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Email Confirmation</title><style>body{{font-family:Arial,sans-serif;background-color:#f4f4f7;margin:0;padding:0}}.container{{max-width:600px;margin:auto;background:#ffffff;padding:20px;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1)}}.header{{padding-bottom:20px}}.header img{{width:150px}}.button{{background-color:#007BFF;color:white !important;padding:12px 20px;text-decoration:none;border-radius:5px;display:inline-block;margin-top:20px}}.footer{{text-align:center;font-size:12px;color:#888;margin-top:20px}}</style></head><body><div class=\"container\"><div class=\"header\"><img src=\"https://i.ibb.co/gZjcQ1BG/Whats-App-Image-2025-04-21-at-13-21-33-cf3c447e.jpg\" alt=\"DocNet Logo\"></div><h2>Reset Password</h2><p>Hello {username},</p><p>We received a request to reset the password associated with your account at <strong>DocNet</strong>. If you made this request, please click the button below to choose a new password and regain access to your account. This link will expire after a limited time for your security.</p><a href=\"{email.Link}\" class=\"button\">Reset Password</a><p>If you did not make this request or believe this message was sent to you by mistake, please disregard this email. No further action will be taken without your confirmation.</p><div class=\"footer\">&copy; 2025 ITI Student Team. All rights reserved.</div></div></body></html>\r\n";

            using SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.EnableSsl = true;
            smtpClient.Credentials = new NetworkCredential("doctordotnet62@gmail.com", "dznbacdlebzliuuk");
            smtpClient.Send(message);
        }
        public void SendEmail(Email email, string username, string body)
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress("doctordotnet62@gmail.com");
            message.To.Add(email.To);
            message.IsBodyHtml = true;
            message.Subject = email.Subject;
            message.Body = body;
            using SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.EnableSsl = true;
            smtpClient.Credentials = new NetworkCredential("doctordotnet62@gmail.com", "dznbacdlebzliuuk");
            smtpClient.Send(message);
        }

    }
}
