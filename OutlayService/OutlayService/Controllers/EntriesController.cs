using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OutlayService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace OutlayService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("specificdoman")]
    public class EntriesController : ControllerBase
    {
        private readonly OutlayDbContext _context;
        public EntriesController(OutlayDbContext context)
        {
            _context = context;
        }
        //get method
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entry>>> GetEntries()
        {
            return await _context.Entries.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Entry>> GetEntry(int id)
        {
            var entry = await _context.Entries.FindAsync(id);

            if (entry == null)
            {
                return NotFound();
            }

            return entry;
        }
        //post method
        [HttpPost]

        public async Task<ActionResult<Entry>> PostEntries([FromBody]Entry entry)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            //try
            //{
            //    _context.Entries.Add(entry);
            //    await _context.SaveChangesAsync();

            //    return Ok("Entry Created");

            //}
            //catch (Exception ex)
            //{

            //    return BadRequest(ex.Message);
            //}
            _context.Entries.Add(entry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntry", new { id = entry.Id }, entry);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEntry(int id,Entry entry)
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);
            //if (id != entry.Id)
            //    return BadRequest();

            //try
            //{
            //    _context.Entry(entry).State = EntityState.Modified;
            //    await _context.SaveChangesAsync();
            //    return Ok("Entry Updated!");
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(ex.Message);
            //}
            if (id != entry.Id)
            {
                return BadRequest();
            }

            _context.Entry(entry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();

        }
        private bool EntryExists(int id)
        {
            return _context.Entries.Any(e => e.Id == id);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Entry>> DeleteEntry(int id)
        {
            var entry = await _context.Entries.FindAsync(id);
            if (entry == null)
            {
                return NotFound();
            }

            _context.Entries.Remove(entry);
            await _context.SaveChangesAsync();

            return entry;
        }
    }
}