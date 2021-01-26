using Microsoft.AspNetCore.Mvc;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private ICommentRepository _commentRepo;

        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }

        [HttpGet("{postId}")]
        public IActionResult GetById(int postId)
        {
            var comments = _commentRepo.GetById(postId);
            return Ok(comments);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepo.Delete(id);
            return NoContent();
        }

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, Comment comment)
        //{
        //    if (id != comment.Id)
        //    {
        //        return BadRequest();
        //    }
        //    var currentUser = GetCurrentUserProfile();

        //    if (currentUser.UserTypeId != UserType.ADMIN_ID)
        //    {
        //        return Unauthorized();
        //    }
        //    _categoryRepo.Update(category);
        //    return NoContent();
        //}
    }
}