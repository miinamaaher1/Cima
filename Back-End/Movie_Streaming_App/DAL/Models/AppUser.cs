using DAL.Enums;
using Microsoft.AspNetCore.Identity;

namespace DAL.Models
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public DateOnly BirthDate { get; set; }
        public SubscriptionType SubscriptionType { get; set; }
        public bool IsSubscriptionValid { get; set; }
        public virtual ICollection<UserFavorites> Favorites { get; set; } = new HashSet<UserFavorites>();
        public virtual ICollection<UserWatch> WatchList { get; set; } = new HashSet<UserWatch>();
    }
}