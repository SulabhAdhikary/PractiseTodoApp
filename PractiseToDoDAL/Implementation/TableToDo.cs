using System;
using System.Collections.Generic;
using System.Text;
using ToDoDataContext;


namespace PractiseToDoDAL.Implementation
{
    public class TableToDo : Repository
    {

        public TableToDo(ToDoContext TtdContext) : base(TtdContext) { }
        
    }
}
