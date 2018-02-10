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

        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public async Task<IEnumerable<WeatherForecast>> WeatherForecasts()
        {
            var rng = new Random();
            var test =await  ToDoBusinessLayer.GetAll();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpPost("[action]")]
        public IActionResult PostData([FromBody]ToDoViewModel toDoDomain)
        {

            ToDoBusinessLayer.Add(new ToDoViewModel()
            {

                Id = 5.ToString(),
                Name = "Sulabh",
                Description = "this is descript",
                IsCompleted = false
                
            });

            OkResult obj = new OkResult();
            return obj;
        }



        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
