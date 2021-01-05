﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            return _context.Post
                .Where(p => p.IsApproved)
                .Where(p => p.PublishDateTime <= DateTime.Now)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    SpaceCount = p.Content.IndexOf(' ', 50),
                    AbbreviatedText = p.Content
                })
                .ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .Include(p => p.Category)
                .Where(p => p.Id == id)
                .Single();
        }
    }
}
