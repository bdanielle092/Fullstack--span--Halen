using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;


namespace Tabloid_Fullstack.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private ApplicationDbContext _context;

        public bool Active { get; private set; }

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> Get()
        {
            return _context.Category
                .Where(c => c.Active )
                .OrderBy(c => c.Name)
                .ToList();
        }

        public Category GetById(int id)
        {
            return _context.Category
                .FirstOrDefault(c => c.Id == id);
        }

        public void Add(Category category)
        {
            category.Active = true;
            _context.Add(category);
            _context.SaveChanges();
        }

        public void Update(Category category)
        {
             category.Active = true;
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var category  = GetById(id);
            category.Active = false;
            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
