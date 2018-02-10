using Microsoft.EntityFrameworkCore;
using System;
using ToDoEntities;

namespace ToDoDataContext
{
  
        public class ToDoContext : DbContext
        {
             public ToDoContext(DbContextOptions<ToDoContext> options) : base(options) { }
             public DbSet<ToDoEntity> ToDoModels { get; set; }
        }
    
}
