using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class TagRepository : ITagRepository
    {
        private ApplicationDbContext _context;
        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        //Get all the tags and order alphabetically
        public List<Tag> Get()
        {
            return _context.Tag.Where(t => t.Active)
             .OrderBy(t => t.Name).ToList();
        }
        public void Add(Tag tag)
        {
            tag.Active = true;
            _context.Add(tag);
            _context.SaveChanges();
        }

        public Tag GetTagById(int id)
        {
            return _context.Tag.FirstOrDefault(t => t.Id == id);
        }
        public void Delete(int id)
        {
            var tagToDelete = GetTagById(id);
            tagToDelete.Active = false;
            _context.Entry(tagToDelete).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }
        

        public void Update(Tag tag)
        {
            tag.Active = true;
            _context.Entry(tag).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }

    }
}
