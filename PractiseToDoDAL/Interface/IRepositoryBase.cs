using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PractiseToDoDAL
{
    public interface IRepositoryBase
    {

        IQueryable<T> GetAll<T>() where T : class;
        IQueryable<T> GetAllIncluding<T>(params Expression<Func<T, object>>[] includes) where T : class;
        Task  Add<T>(T currentData) where T : class;
        Task Update<T>(T updated, int key) where T : class;
        Task Delete<T>(int key) where T : class;
    }

   
}
