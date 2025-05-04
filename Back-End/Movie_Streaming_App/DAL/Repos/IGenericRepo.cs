
namespace DAL.Repos
{
    public interface IGenericRepo<T>
    {
        Task<List<T>?> GetAll();
        Task<T?> GetById(int id);
        Task<T?> AddAsync(T entity);
        Task<T?> UpdateAsync(T entity);
        bool Delete(T entity);
    }
}
