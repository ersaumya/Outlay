using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OutlayService.Models
{
    public class OutlayDbContext:DbContext
    {
        public OutlayDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Entry> Entries { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
