namespace BLL.Service.EmailService
{
    public class Email
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Link { get; set; }
        public MailTemplates Template { get; set; }
    }
}
