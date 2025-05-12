using DAL.Models;

namespace DAL.Repos
{
    public class UserListRepo<T> : GenericRepo<T>, IUserListRepo<T> where T : UserList
    {
        private readonly AppDbContext _context;

        public UserListRepo(AppDbContext context) : base(context) { }

        public async Task<List<T>?> GetByUserIdAsync(int userId)
            => _context.Set<T>().Where(l => l.AppUserId == userId).ToList();
    }
}
