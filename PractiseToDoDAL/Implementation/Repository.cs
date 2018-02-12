using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using ToDoDataContext;

namespace PractiseToDoDAL
{
    public class Repository : IRepositoryBase
    {
        private ToDoContext _context;

        public Repository(ToDoContext context)
        {
            _context = context;
        }
        public virtual async Task Add<T>(T currentData) where T : class
        {
            try
            {
                await _context.Set<T>().AddAsync(currentData);
                await _context.SaveChangesAsync();

            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public virtual IQueryable<T> GetAll<T>() where T : class
        {
            var query = _context.Set<T>();
            return query;
        }

        public virtual IQueryable<T> GetAllIncluding<T>(params Expression<Func<T, object>>[] includes) where T : class
        {
            IQueryable<T> retValue = _context.Set<T>();
            foreach (var item in includes)
            {
                retValue = retValue.Include(item);
            }
            return retValue;
        }

        public virtual async Task Update<T>(T updated, int key) where T : class
        {
            T existing = _context.Set<T>().Find(key);
            if (existing != null)
            {
                _context.Entry(existing).CurrentValues.SetValues(updated);
                await _context.SaveChangesAsync();

            }
        }

        public virtual async Task Delete<T>(int key) where T : class
        {
            T existing = _context.Set<T>().Find(key);
            if (existing != null)
            {
                _context.Remove(existing);
                await _context.SaveChangesAsync();

            }
        }


    }
}
