using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
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


        [HttpGet("myposts")]
        public IActionResult GetMyPosts()

        {
            var user = GetCurrentUserProfile();
            var posts = _repo.GetByUserId(user.Id);
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult Add(Post post)
        {
            var user = GetCurrentUserProfile();
            post.UserProfileId = user.Id;
            post.CreateDateTime = DateTime.Now;
            if(user.UserTypeId == 1) { post.IsApproved = true; }
            post.IsApproved = true;
            _repo.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpDelete("myposts/{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var existingPost = _repo.GetById(id);
            if (existingPost.UserProfileId != user.Id && user.UserTypeId != 1)
            {
                return Unauthorized();
            }
            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("myposts/{id}")]
        public IActionResult Update(int id, Post post)
        {
            var existingPost = _repo.GetById(id);
            var user = GetCurrentUserProfile();

            if (id != post.Id)
            {
                return BadRequest();
            }

            if (existingPost.UserProfileId != user.Id )
            {
                return Unauthorized();
            }

            existingPost.Title = post.Title;
            existingPost.Content = post.Content;
            existingPost.CategoryId = post.CategoryId;
            _repo.Update(existingPost);
            return NoContent();
        }
       

    }
}
