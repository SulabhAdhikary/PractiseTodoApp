using System;
using System.Collections.Generic;
using System.Text;

namespace PractiseToDoBAL
{
    public class ToDoViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Boolean IsCompleted { get; set; }
        public string Priority { get; set; }

    }
}
