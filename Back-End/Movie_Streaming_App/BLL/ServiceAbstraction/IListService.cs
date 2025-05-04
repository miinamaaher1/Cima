namespace BLL.ServiceAbstraction
{
    public interface IListService<T>
    {
        Task<List<T>?> GetByUserIdAsync(int userId);
        Task<T?> AddAsync(T entity);
        bool Delete(T entity);
    }
}
