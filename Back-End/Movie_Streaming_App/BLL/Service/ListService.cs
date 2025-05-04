using BLL.ServiceAbstraction;
using DAL.Models;
using DAL.Repos;

namespace BLL.Service
{
    public class ListService<T> : IListService<T> where T : UserList
    {
        private readonly IUserListRepo<T> _repo;
        public ListService(IUserListRepo<T> repo) => _repo = repo;
        public Task<List<T>?> GetByUserIdAsync(int userId) => _repo.GetByUserIdAsync(userId);
        public async Task<T?> AddAsync(T entity) => await _repo.AddAsync(entity);
        public bool Delete(T entity) => _repo.Delete(entity);
    }
}
