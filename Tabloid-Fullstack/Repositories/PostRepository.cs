using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
    public class PostRepository : IPostRepository
    {
        private ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostSummary> Get()
        {
            // regex = new regex
            var regex = new Regex(@"\w*\s*");
            return _context.Post
                .Where(p => p.Active)
                .Include(p => p.Category)
                .Where(p => p.IsApproved)
                .Where(p => p.PublishDateTime <= DateTime.Now)
                .OrderByDescending(p => p.PublishDateTime)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    Title = p.Title,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    AbbreviatedText = p.Content.Substring(0, 200),
                    PublishDateTime = p.PublishDateTime,
                    Category = p.Category,
                    //content = p.Content is getting the post content
                    Content = p.Content,
                    //wordCount = the regex.matches is removing the space from the post content and then the ,count is counting the number of words in the content 
                    wordCount = regex.Matches(p.Content).Count
                })
                .ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                .Where(p => p.Active)
                .Include(p => p.UserProfile)
                .Include(p => p.Category)
                .Include(p => p.PostTags)
                   .ThenInclude(pt => pt.Tag)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.UserProfile)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public List<Post> GetByUserId(int id)
        {
            return _context.Post
                .Where(p => p.Active)
                .Include(p => p.UserProfile)
                .Include(p => p.Category)
                .Where(p => p.UserProfileId == id)
                .OrderByDescending(p => p.PublishDateTime)
                .ToList();
        }

        public List<ReactionCount> GetReactionCounts(int postId)
        {
            return _context.Reaction
                .Select(r => new ReactionCount()
                {
                    Reaction = r,
                    Count = r.PostReactions.Count(pr => pr.PostId == postId)
                })
                .ToList();
        }
        public void Add(Comment comment)
        {
            comment.Active = true;
            _context.Add(comment);
            _context.SaveChanges();
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .Include(up => up.Post)
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }
        public void Add(Post post)
        {
            post.Active = true;
            _context.Add(post);
            _context.SaveChanges();
        }
        public void AddPostTag(PostTag postTag)
        {
            _context.Add(postTag);
            _context.SaveChanges();
        }
        public void RemovePostTag(PostTag postTag)
        {
            _context.Remove(postTag);
            _context.SaveChanges();
            _context.SaveChanges();
        }

        public PostTag GetPostTagById(int id)
        {
            var postTag = _context.PostTag.FirstOrDefault(pt => pt.Id == id);
            return postTag;
        }
        public void Delete(int id)
        {
            var post = GetById(id);
            post.Active = false;
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            post.Active = true;
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
