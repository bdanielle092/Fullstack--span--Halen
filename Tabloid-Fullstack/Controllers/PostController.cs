using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private readonly IPostRepository _repo;
        private readonly IUserProfileRepository _userRepo;

        public PostController(IPostRepository repo, IUserProfileRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var posts = _repo.Get();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _repo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }

            var reactionCounts = _repo.GetReactionCounts(id);
            var postDetails = new PostDetails()
            {
                Post = post,
                ReactionCounts = reactionCounts
            };
            return Ok(postDetails);
        }

        //[HttpPost]
        //public IActionResult Post(Comment comment)
        //{
        //    _repo.Add(comment);
        //    return Ok();
        //}

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpPost("addcomment")]
        public IActionResult Add(Comment comment)
        {
            var user = GetCurrentUserProfile();
            comment.UserProfileId = user.Id;
            comment.CreateDateTime = DateTime.Now;
            _repo.Add(comment);
            return Ok(comment);
        }

        [HttpPost]
        public IActionResult Add(Post post)
        {
            var user = GetCurrentUserProfile();
            post.UserProfileId = user.Id;
            post.CreateDateTime = DateTime.Now;
            post.IsApproved = true;
            _repo.Add(post);
            return Ok(post);
        }
    }
}
