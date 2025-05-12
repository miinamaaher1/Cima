using DAL.Enums;

namespace DAL.Models
{
    public abstract class UserList
    {
        public int Id { get; set; }
        public VideoType VideoType { get; set; }
        public int AppUserId { get; set; }
    }
}
