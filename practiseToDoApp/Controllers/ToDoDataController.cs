using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PractiseToDoBAL;

namespace practiseToDoApp.Controllers
{
    [Route("api/[controller]")]
    public class ToDoDataController : Controller
    {
        public IBalToDo ToDoBusinessLayer { get; set; }

        public ToDoDataController(IBalToDo businessLayer)
        {
            ToDoBusinessLayer = businessLayer;
        }


        [HttpGet("[action]")]
        public async Task<List<ToDoViewModel>> GetAllToDos()
        { 
            return await  ToDoBusinessLayer.GetAll();
        }

        [HttpGet("[action]")]
        public async Task<ToDoViewModel> GetToByID(string id)
        {
            var lstToDos= await ToDoBusinessLayer.GetAll();
            return  lstToDos.Where(t => t.Id == id).Select(t=>t).FirstOrDefault<ToDoViewModel>();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> PostData([FromBody]ToDoViewModel toDoDomain)
        {
            try
            {
                if (string.IsNullOrEmpty(toDoDomain.Id))
                {
                    toDoDomain.Id = await GetIDForNewData();
                    await ToDoBusinessLayer.Add(toDoDomain);
                }
                else
                {
                    await ToDoBusinessLayer.Update(toDoDomain);
                }
                OkResult obj = new OkResult();
                return obj;
            }catch(Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }



        private async Task<string> GetIDForNewData()
        {
            var allExistingDate = await ToDoBusinessLayer.GetAll();
            if (allExistingDate != null && allExistingDate.Count() > 0)
            {
                var allIDs = allExistingDate.Select(t => Convert.ToUInt32(t.Id));
                if (allIDs != null && allIDs.Count() > 0)
                {
                    return Convert.ToString(allIDs.Max() + 1);
                }
            }
            return "1";
        }
        
  
    }
}
