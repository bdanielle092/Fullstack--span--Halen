using System.Collections.Generic;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public interface ITagRepository
    {
        List<Tag> Get();
        public void Add(Tag tag);
        public Tag GetTagById(int id);
        public void Update(Tag tag);
        public void Delete(int id);
    }
}