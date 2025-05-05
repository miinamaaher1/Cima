using BLL.DTOs;
using DAL.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.ServiceAbstraction
{
    public interface IPaymentService
    {
        public Task<PaymentResultDto> CreateOrUpdatePaymentAsync(string email,SubscriptionType type);
        public Task<string> CreatePaymentSession(string email, SubscriptionType type, string domain);
        public Task UpdatePaymentStatusAsync(string JsonRequest, string StripeHeader);

    }
}
