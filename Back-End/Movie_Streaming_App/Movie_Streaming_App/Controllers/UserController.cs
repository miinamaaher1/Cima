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

        public UserController(UserManager<AppUser> userManager) => _userManager = userManager;
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                if (User.IsInRole("admin"))
                {
                    var users = _userManager.Users.Select(u => new { u.FirstName, u.LastName, u.Email, u.BirthDate, u.Gender, u.IsSubscriptionValid, u.SubscriptionType });
                    return Ok(new { users });
                }
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                return Ok(new { user.FirstName, user.LastName, user.Email, user.BirthDate, user.Gender, user.IsSubscriptionValid, user.SubscriptionType });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }
    }
}
