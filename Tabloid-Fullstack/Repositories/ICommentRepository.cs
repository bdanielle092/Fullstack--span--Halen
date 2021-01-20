using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> Get();

        
    }
}