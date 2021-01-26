using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Comment> GetById(int postId)
        {
            return _context.Comment
                .Include(c => c.UserProfile)
                .Where(c => c.PostId == postId)
                .Where(c => c.Active == true)
                .ToList();
        }

        public Comment GetCommentById(int id)
        {
            return _context.Comment.FirstOrDefault(c => c.Id == id);
        }
        public void Delete(int id)
        {
            var deletingComment = GetCommentById(id);
            deletingComment.Active = false;
            _context.Entry(deletingComment).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
        }
    }
}