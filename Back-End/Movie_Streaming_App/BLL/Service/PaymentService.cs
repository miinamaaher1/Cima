using BLL.DTOs;
using BLL.ServiceAbstraction;
using DAL.Enums;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Service
{
    public class PaymentService : IPaymentService
    {
        private IConfiguration _configuration { get; }
        public UserManager<AppUser> _userManager { get; }
        private PaymentIntentService _intentService { get; }
        private SessionService _sessionService { get; }
        public PaymentService(IConfiguration configuration, UserManager<AppUser> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            _intentService = new PaymentIntentService();
            _sessionService = new SessionService();

        }


        public async Task<PaymentResultDto> CreateOrUpdatePaymentAsync(string email, SubscriptionType type)
        {

            var currentUser = await _userManager.FindByEmailAsync(email);
            currentUser.SubscriptionType = type;
            await _userManager.UpdateAsync(currentUser);

            var secretKey = _configuration.GetSection("StripeSetting")["Secretkey"];

            StripeConfiguration.ApiKey = secretKey;

            PaymentIntentCreateOptions options = new PaymentIntentCreateOptions()
            {

                Amount = ((int)(currentUser.SubscriptionType)) * 133 * 100,
                Currency = "usd",
                PaymentMethodTypes = new() { "card" },
                Metadata = new Dictionary<string, string>
                            {
                                { "email", email }
                            }

            };


            var paymentIntent = await _intentService.CreateAsync(options);

            return new PaymentResultDto(paymentIntent.Id, paymentIntent.ClientSecret);

        }


    
        public async Task UpdatePaymentStatusAsync(string JsonRequest, string StripeHeader)
        {
             string email = string.Empty;
             string emailFromSession = string.Empty;
            var endPointSecret = _configuration.GetSection("StripeSetting")["EndPointSecret"];

            var stripeEvent = EventUtility.ConstructEvent(JsonRequest,

                StripeHeader, endPointSecret);

            if (stripeEvent.Data.Object is PaymentIntent paymentIntent)
            {
                email = paymentIntent.Metadata["email"];
            }
            if(stripeEvent.Data.Object is Session session)
            {
                emailFromSession = session.CustomerEmail;
            }

            // Handle the event
            if (stripeEvent.Type == EventTypes.CheckoutSessionAsyncPaymentFailed)
            {
                await UpdateUserSubscriptionAsync(emailFromSession, false);
            }
            //else if (stripeEvent.Type == EventTypes.CheckoutSessionAsyncPaymentSucceeded)
            //{
            //    UpdateUserSubscriptionAsync(emaiFromSession, true);
            //}
            else if (stripeEvent.Type == EventTypes.CheckoutSessionCompleted)
            {
                UpdateUserSubscriptionAsync(emailFromSession, true);

            }
            else if (stripeEvent.Type == EventTypes.CheckoutSessionExpired)
            {
                UpdateUserSubscriptionAsync(emailFromSession, false);

            }
            else if (stripeEvent.Type == EventTypes.PaymentIntentCanceled)
            {
                await UpdateUserSubscriptionAsync(email, false);

            }
            else if (stripeEvent.Type == EventTypes.PaymentIntentPaymentFailed)
            {
                await UpdateUserSubscriptionAsync(email, false);

            }
            else if (stripeEvent.Type == EventTypes.PaymentIntentSucceeded)
            {
                await UpdateUserSubscriptionAsync(email, true);

            }

            // ... handle other event types
            else
            {
                Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
            }

            //return Ok();


        }

        private async Task UpdateUserSubscriptionAsync(string email, bool isSuccess)
        {
            var currentUser = await _userManager.FindByEmailAsync(email)??throw new Exception("User Not-Found !!");
            if (isSuccess)
            {
                currentUser.IsSubscriptionValid = true;
                currentUser.LastPaymentTime = DateTime.UtcNow;
            }
            else
            {
                currentUser.IsSubscriptionValid = false;
                currentUser.SubscriptionType = SubscriptionType.None;
            }
            await _userManager.UpdateAsync(currentUser);
        }

        public async Task<string> CreatePaymentSession(string email, SubscriptionType type, string domain)
        {
            var currentUser = await _userManager.FindByEmailAsync(email) ?? throw new Exception("User Not-Found !!");
            currentUser.SubscriptionType = type;    
            await _userManager.UpdateAsync(currentUser);

            var secretKey = _configuration.GetSection("StripeSetting")["Secretkey"];

            StripeConfiguration.ApiKey = secretKey;

            // Calculate the amount based on the subscription type
            var amount = ((int)(type)) * 133 * 100; // Assuming SubscriptionType is an enum or a comparable type

            var options = new SessionCreateOptions()
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
        {
            new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    UnitAmount = amount, // The amount in the smallest currency unit (cents)
                    Currency = "usd",    // Adjust to the correct currency
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = "Subscription"
                        ,Description= type.ToString()
                    }
                },
                Quantity = 1,
            }
        },
                Mode = "payment",
                //SuccessUrl = $"{domain}/success?session_id={{CHECKOUT_SESSION_ID}}",
                SuccessUrl = $"{domain}/success",
                CancelUrl = $"{domain}/cancel",
                CustomerEmail = email,
                Metadata = new Dictionary<string, string>
                            {
                                { "email", email }
                            }
            };

            //var service = new SessionService();
            Session session = await _sessionService.CreateAsync(options);

            return session.Url;  
        }

        public async Task<bool> IsSubscribed(string email)
        {
            var currentUser = await _userManager.FindByEmailAsync(email) ?? throw new Exception("User Not-Found !!");

           var isExpired =  (DateTime.UtcNow - currentUser.LastPaymentTime)> TimeSpan.FromDays(30);
            if (isExpired)
            {
              await  UpdateUserSubscriptionAsync(email, false);
            }

            return currentUser.IsSubscriptionValid;
        }

        public async Task<SubscriptionType> GetSubscriptionPlan(string email)
        {
            var currentUser = await _userManager.FindByEmailAsync(email) ?? throw new Exception("User Not-Found !!");

            if (!currentUser.IsSubscriptionValid)
            {
               await UpdateUserSubscriptionAsync(email,false);
            }

            return currentUser.SubscriptionType;
        }

    }
}