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
    }
}