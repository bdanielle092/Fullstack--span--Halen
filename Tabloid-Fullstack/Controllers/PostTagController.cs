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
    public class PostTagController : ControllerBase
    {

        private readonly IPostRepository _repo;
        private readonly IUserProfileRepository _userProfileRepository;
        private ICommentRepository _commentRepo;
        private readonly ITagRepository _tagRepo;


        public PostTagController(IPostRepository repo, ITagRepository tagRepo, ICommentRepository commentRepo, IUserProfileRepository userProfileRepository)
        {
            _repo = repo;
            _commentRepo = commentRepo;
            _userProfileRepository = userProfileRepository;
            _tagRepo = tagRepo;
        }
        private UserProfile GetCurrentUserProfile()
        {
            try
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public IActionResult Add(PostTag postTag)
        {
            var currentUser = GetCurrentUserProfile();
            var postUserId = _repo.GetById(postTag.PostId);

            if (currentUser.Id != postUserId.UserProfileId)
            {
                return NotFound();
            }

            _repo.AddPostTag(postTag);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingPostTag = _repo.GetPostTagById(id);
            var currentUser = GetCurrentUserProfile();
            if (existingPostTag == null) { return BadRequest(); }
            var existingPost = _repo.GetById(existingPostTag.PostId);
            if (existingPost.UserProfileId != currentUser.Id && currentUser.UserTypeId != 1) { return Unauthorized(); }
            _repo.RemovePostTag(existingPostTag);
            return NoContent();
        }
    }
}
