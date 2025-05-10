using DAL.Models;
using Microsoft.AspNetCore.Identity;

namespace DAL
{
    public class DataSeeding : IDataSeeding
    {
        private UserManager<AppUser> _userManager;
        private RoleManager<IdentityRole<int>> _roleManager;
        public DataSeeding(UserManager<AppUser> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task InitializeIdentityAsync()
        {
            if (!_roleManager.Roles.Any())
            {
                await _roleManager.CreateAsync(new IdentityRole<int>("admin"));
                await _roleManager.CreateAsync(new IdentityRole<int>("user"));
            }
            if (!_userManager.Users.Any())
            {
                var admin = new AppUser()
                {
                    UserName = "test@test.com",
                    FirstName = "Movies",
                    LastName = "admin",
                    Email = "test@test.com",
                    EmailConfirmed = true
                };
                await _userManager.CreateAsync(admin, "Aa$12345");
                await _userManager.AddToRoleAsync(admin, "admin");
            }
        }
    }
}
