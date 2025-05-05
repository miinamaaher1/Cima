using BLL.Service.EmailService;

namespace BLL.ServiceAbstraction
{
    public interface IEmailService
    {
        public void SendEmail(Email email, string username);
    }
}
