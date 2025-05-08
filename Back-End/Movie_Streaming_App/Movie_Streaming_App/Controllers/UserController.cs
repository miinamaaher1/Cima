using BLL.ServiceAbstraction;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Movie_Streaming_App.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IPaymentService _paymentService;

        public UserController(UserManager<AppUser> userManager, IPaymentService paymentService)
        {
            _userManager = userManager;
            _paymentService = paymentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                if (User.IsInRole("admin"))
                {
                    var users = _userManager.Users.Select(u => new { u.FirstName, u.LastName, u.Email, u.BirthDate, u.Gender, u.IsSubscriptionValid, u.SubscriptionType }).ToList();
                    return Ok(new { users });
                }
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                return Ok(new { user.FirstName, user.LastName, user.Email, user.BirthDate, user.Gender });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("subscription")]
        public async Task<IActionResult> GetUserSubscription()
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                var subscriptionState = await _paymentService.IsSubscribed(email);
                if (subscriptionState)
                {
                    var subscriptionPlan = await _paymentService.GetSubscriptionPlan(email);
                    return Ok(new { subscriptionState, subscriptionPlan });
                }
                return Ok(new { subscriptionState });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
