using System.Collections.Generic;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<PostSummary> Get();
        Post GetById(int id);
        List<Post> GetByUserId(int id);
        List<ReactionCount> GetReactionCounts(int postId);

        void Add(Comment comment);

        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Update(Post post);
    }
}