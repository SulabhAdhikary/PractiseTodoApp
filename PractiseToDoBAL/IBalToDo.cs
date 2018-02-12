using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PractiseToDoBAL
{
    public  interface IBalToDo
    {
        Task Add(ToDoViewModel model);
        Task Update(ToDoViewModel model);
        Task Delete(int id);
        Task<List<ToDoViewModel>> GetAll();
    }
}
