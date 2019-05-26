using HiShare.Services;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
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

    public class ArticleDTO
    {
        public ArticleDTO(Article article)
        {
            AccessToken = article.AccessToken;
            PublishedAt = article.PublishedAt;
            CommentsCount = article.Comments.Count;
            Title = article.Title;
        }

        public string AccessToken { get; set; }
        public DateTime PublishedAt { get; set; }
        public int CommentsCount { get; set; }
        public string Title { get; set; }
    }

    public class ArticleRequestDTO
    {
        public bool AllowComment { get; set; }
        public bool IsPublic { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }
    }

    public class Article
    {
        public Article()
        {
            Initialize();
        }

        public Article(ArticleRequestDTO requestDTO)
        {
            Initialize();
            AllowComment = requestDTO.AllowComment;
            IsPublic = requestDTO.IsPublic;
            Title = requestDTO.Title;
            Content = requestDTO.Content;
        }
        private void Initialize()
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
