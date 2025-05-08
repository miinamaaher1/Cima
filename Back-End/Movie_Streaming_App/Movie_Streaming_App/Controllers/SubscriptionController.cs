using BLL.DTOs;
using BLL.ServiceAbstraction;
using DAL.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Movie_Streaming_App.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController(IPaymentService _paymentService) : ControllerBase
    {

        [HttpPost]
        public async Task<ActionResult<PaymentResultDto>> CreateOrUpdatePaymentIntent(SubscriptionType type)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var result = await _paymentService.CreateOrUpdatePaymentAsync(email, type);
            return Ok(result);
        }
        [HttpPost("Session")]
        public async Task<IActionResult> CreatePaymentSession(string domain, SubscriptionType type)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var sessionUrl = await _paymentService.CreatePaymentSession(email, type, domain);
            return Ok(new
            {
                paymentUrl = sessionUrl
            });
        }

        [AllowAnonymous]
        [HttpPost("webhook")]
        public async Task<IActionResult> WebHook()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            await _paymentService.UpdatePaymentStatusAsync(json, Request.Headers["Stripe-Signature"]);
            return new EmptyResult();
        }

    }
}
