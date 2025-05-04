using DAL.Models;

namespace DAL.Repos
{
    public class GenericRepo<T> : IGenericRepo<T> where T : class
    {
        private readonly AppDbContext _context;

        public GenericRepo(AppDbContext context) => _context = context;
        public async Task<List<T>?> GetAll() => _context.Set<T>().ToList();
        public async Task<T?> GetById(int id) => await _context.Set<T>().FindAsync(id);
        public async Task<T?> AddAsync(T entity)
        {
            try
            {
                await _context.Set<T>().AddAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return null;
            }
            return entity;
        }
        public async Task<T?> UpdateAsync(T entity)
        {
            try
            {
                _context.Entry(entity).CurrentValues.SetValues(entity);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return null;
            }
            return entity;
        }
        public bool Delete(T entity)
        {
            try
            {
                _context.Set<T>().Remove(entity);
                _context.SaveChanges();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
