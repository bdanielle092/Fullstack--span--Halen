using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TagController : ControllerBase
    {
        private ITagRepository _tagRepository;
        private IUserProfileRepository _userRepo;

        public TagController(ITagRepository tagRepository, IUserProfileRepository userRepo)
        {
            _tagRepository = tagRepository;
            _userRepo = userRepo;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUserProfile();
            if(currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return NotFound();
            }
            var tags = _tagRepository.Get();
            return Ok(tags);
        }
        //Get the current user
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            var currentUser = GetCurrentUserProfile();
            if(currentUser.UserTypeId != UserType.ADMIN_ID)
            {
                return NotFound();
            }
            _tagRepository.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }
    }
}
