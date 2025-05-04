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
    public class ListController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IListService<UserFavorites> _favoritesService;
        private readonly IListService<UserWatch> _watchListService;
        public ListController(IListService<UserFavorites> favoritesService, IListService<UserWatch> watchListService, UserManager<AppUser> userManager)
        {
            _favoritesService = favoritesService;
            _watchListService = watchListService;
            _userManager = userManager;
        }
        [HttpGet("favorites")]
        public async Task<IActionResult> GetFavorites()
        {
            List<UserFavorites>? userFavorites;
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                userFavorites = user?.Favorites?.ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(userFavorites?.Select(f => new { f.Id, f.VideoType }));
        }
        [HttpPost("favorites")]
        public async Task<IActionResult> NewFavorite(UserFavorites userFavorites)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                userFavorites.AppUserId = user.Id;
                await _favoritesService.AddAsync(userFavorites);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new { userFavorites.Id, userFavorites.VideoType });
        }
        [HttpDelete("favorites")]
        public async Task<IActionResult> DeleteFavorite(UserFavorites userFavorites)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                userFavorites.AppUserId = user.Id;
                _favoritesService.Delete(userFavorites);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return NoContent();
        }
        [HttpGet("watchlist")]
        public async Task<IActionResult> GetWatchList()
        {
            List<UserWatch>? userWatchList;
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                userWatchList = user?.WatchList?.ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(userWatchList.Select(f => new { f.Id, f.VideoType }));
        }
        [HttpPost("watchlist")]
        public async Task<IActionResult> NewWatch(UserWatch userWatchList)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                userWatchList.AppUserId = user.Id;
                await _watchListService.AddAsync(userWatchList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(new { userWatchList.Id, userWatchList.VideoType });
        }
        [HttpDelete("watchlist")]
        public async Task<IActionResult> DeleteWatch(UserWatch userWatchList)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                var user = await _userManager.FindByEmailAsync(email);
                userWatchList.AppUserId = user.Id;
                _watchListService.Delete(userWatchList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return NoContent();
        }
    }
}
