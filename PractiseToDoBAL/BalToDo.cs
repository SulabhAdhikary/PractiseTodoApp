using PractiseToDoDAL;
using System;
using System.Threading.Tasks;
using ToDoEntities;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PractiseToDoBAL
{
    public class BalToDo:IBalToDo
    {
        private IRepositoryBase _ITableToDo;
        public BalToDo(IRepositoryBase tableToDo)
        {
            _ITableToDo = tableToDo;
        }

        public async Task Add(ToDoViewModel model)
        {
            try
            {
                ToDoEntity objToDoEntity = new ToDoEntity
                {
                    Id = Convert.ToInt32(model.Id),
                    Name = model.Name,
                    Description = model.Description,
                    AddedDate = DateTime.Now,
                    IsCompleted = false,
                    CompletedDate = null,
                    Priority=Convert.ToInt32(model.Priority)
                };

                await  _ITableToDo.Add<ToDoEntity>(objToDoEntity);
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(ToDoViewModel model)
        {
            try
            {
                ToDoEntity objToDoEntity = new ToDoEntity
                {
                    Id = Convert.ToInt32(model.Id),
                    Name = model.Name,
                    Description = model.Description,
                    IsCompleted = model.IsCompleted,
                    CompletedDate = model.IsCompleted ? DateTime.Now : (DateTime?)null,
                    Priority=Convert.ToInt32(model.Priority)
                };

                await _ITableToDo.Update<ToDoEntity>(objToDoEntity, Convert.ToInt32(model.Id));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<ToDoViewModel>> GetAll()
        {
           var datas=  await _ITableToDo.GetAll<ToDoEntity>().ToListAsync();
            List<ToDoViewModel> returnedList = null;
            if (datas != null && datas.Count>0)
            {
                returnedList = datas.Select(t => new ToDoViewModel
                {
                    Id = t.Id.ToString(),
                    Name = t.Name,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    Priority = t.Priority.ToString()
                }).ToList<ToDoViewModel>();
            }
            return returnedList;

        }


    }
}
