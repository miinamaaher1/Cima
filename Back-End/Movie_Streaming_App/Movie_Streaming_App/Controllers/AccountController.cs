using BLL.DTOs;
using BLL.ServiceAbstraction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Movie_Streaming_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AccountController(IAuthenticationService authenticationService) => _authenticationService = authenticationService;
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
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
            }
            return Ok(result);
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
                return BadRequest(ex.Message);
            }
            return Ok(new { success = result });
        }
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            bool result;
            try
            {
                result = await _authenticationService.ResetPasswordAsync(resetPasswordDto.Email, resetPasswordDto.newPassword);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new { success = result });
        }
    }
}
