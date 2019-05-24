using HiShare.Services;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Models
{

    public class Comment
    {
        public Comment()
        {
            Id = ArticleService.GenerateToken(16);
            UpVote = 0;
            DownVote = 0;
            PublishedAt = DateTime.Now;
        }

        [BsonElement("Id")]
        public string Id { get; set; }

        [BsonElement("PublishedAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime PublishedAt { get; set; }

        [BsonElement("Content")]
        public string Content { get; set; }

        [BsonElement("UpVote")]
        public int UpVote { get; set; }

        [BsonElement("DownVote")]
        public int DownVote { get; set; }
    }

    public class Article
    {
        public Article()
        {
            AccessToken = ArticleService.GenerateToken(32);
            PublishedAt = DateTime.Now;
            AllowComment = true;
            Comments = new List<Comment>();
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("PublishedAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime PublishedAt { get; set; }

        [BsonElement("ExpiredAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime ExpiredAt { get; set; }

        [BsonElement("AccessToken")]
        public string AccessToken { get; set; }

        [BsonElement("AllowComment")]
        public bool AllowComment { get; set; }

        [BsonElement("IsPublic")]
        public bool IsPublic { get; set; }

        [BsonElement("Comments")]
        public IList<Comment> Comments { get; set; }

        [BsonElement("Content")]
        public string Content { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }
    }
}
