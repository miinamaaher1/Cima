using BLL.DTOs;
using DAL.Enums;

namespace BLL.ServiceAbstraction
{
    public interface IPaymentService
    {
        public Task<PaymentResultDto> CreateOrUpdatePaymentAsync(string email, SubscriptionType type);
        public Task<string> CreatePaymentSession(string email, SubscriptionType type, string domain);
        public Task UpdatePaymentStatusAsync(string JsonRequest, string StripeHeader);
        public Task<bool> IsSubscribed(string email);
        public Task<SubscriptionType> GetSubscriptionPlan(string email);
    }
}
