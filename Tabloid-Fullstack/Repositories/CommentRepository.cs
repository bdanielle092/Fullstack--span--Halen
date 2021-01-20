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

        public List<Comment> Get()
        {
            return _context.Comment.Select(c => new Comment()
            {
                Id = c.Id,
                PostId = c.PostId,
                UserProfileId = c.UserProfileId,
                Subject = c.Subject,
                Content = c.Content,
                CreateDateTime = c.CreateDateTime,
            })
                .ToList(); 
        }
        




    }
}
