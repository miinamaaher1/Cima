using BLL.DTOs;
using BLL.ServiceAbstraction;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Movie_Streaming_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly UserManager<AppUser> _userManager;
        public AccountController(IAuthenticationService authenticationService, UserManager<AppUser> userManager)
        {
            _authenticationService = authenticationService;
            _userManager = userManager;
        }
        //[HttpGet("test-email")]
        //public async Task<IActionResult> TestEmail(string email)
        //{
        //    _emailService.SendEmail(new Email
        //    {
        //        To = email,
        //        Subject = "Confirm Your Email",
        //        Link = Url.Action("ConfirmEmail", "Account", new { email }, Request.Scheme),
        //        Template = MailTemplates.ConfirmEmailTemplate
        //    }, "Test User");
        //    return Ok();
        //}
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            UserResultDto result;
            try
            {
                result = await _authenticationService.LoginAsync(loginDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            return Ok(result);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            UserResultDto result;
            try
            {
                result = await _authenticationService.RegisterAsync(registerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            return Ok(new { result.Email, result.DisplayName });
        }
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string email, string token)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user is null)
                {
                    throw new Exception($"Email Doesn't Exist !!\n {email}");
                }
                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                    return Ok(new { success = true });
                throw new Exception("Failed To Confirm Email!");
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            bool result;
            try
            {
                result = await _authenticationService.ChangePasswordAsync(User.FindFirstValue(ClaimTypes.Email), changePasswordDto.oldPassword, changePasswordDto.newPassword);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            return Ok(new { success = result });
        }
        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPassword(string email)
        {
            string result;
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user is null)
                {
                    throw new Exception($"Email Doesn't Exist !!\n {email}");
                }
                result = await _authenticationService.ForgetPasswordAsync(user.Email, user.FirstName, user.LastName);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            return Ok(new { success = true });
        }
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            bool result;
            try
            {
                result = await _authenticationService.ResetPasswordAsync(resetPasswordDto.Email, resetPasswordDto.token, resetPasswordDto.newPassword);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            return Ok(new { success = result });
        }
    }
}
