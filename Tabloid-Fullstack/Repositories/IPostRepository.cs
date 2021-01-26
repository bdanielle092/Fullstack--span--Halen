﻿using System.Collections.Generic;
using Tabloid_Fullstack.Models;
using Tabloid_Fullstack.Models.ViewModels;

namespace Tabloid_Fullstack.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        List<PostSummary> Get();
        Post GetById(int id);
        List<ReactionCount> GetReactionCounts(int postId);

        void Add(Comment comment);
        void AddPostTag(PostTag postTag);
        //void RemovePostTag(PostTag postTag);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}