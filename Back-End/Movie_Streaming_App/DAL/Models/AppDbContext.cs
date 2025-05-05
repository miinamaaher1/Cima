using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models
{
    public class AppDbContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseLazyLoadingProxies();
        //    base.OnConfiguring(optionsBuilder);
        //}
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserFavorites>()
                   .HasKey(f => new { f.Id, f.AppUserId, f.VideoType });

            builder.Entity<UserWatch>()
                   .HasKey(w => new { w.Id, w.AppUserId, w.VideoType });

            base.OnModelCreating(builder);
        }
    }
}
