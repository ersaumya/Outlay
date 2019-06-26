using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OutlayService.Models
{
    public class Entry
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public bool IsExpense { get; set; }
        public double Value { get; set; }
    }
}
