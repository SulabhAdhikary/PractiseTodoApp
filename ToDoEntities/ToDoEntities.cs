using System;

namespace ToDoEntities
{
    public class ToDoEntity
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime AddedDate { get; set; }
        public Boolean IsCompleted { get; set; }
        public Nullable<DateTime> CompletedDate { get; set; }
        public int Priority { get; set; }
    }
}
