using DAL.Models;

namespace DAL.Repos
{
    public interface IUserListRepo<T> : IGenericRepo<T> where T : UserList
    {
        Task<List<T>?> GetByUserIdAsync(int userId);
    }
}
