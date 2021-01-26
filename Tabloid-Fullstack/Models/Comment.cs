﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tabloid_Fullstack.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int PostId { get; set; }
        public int UserProfileId { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        public DateTime CreateDateTime { get; set; }

        public UserProfile UserProfile { get; set; }

        public bool Active { get; set; }
    }
}