using HiShare.Services;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
namespace HiShare.Models
{
    public class Collection
    {
        public Collection()
        {
            Initialize();
        }

        public Collection(CollectionRequestDTO requestDTO)
        {
            Name = requestDTO.Name;
            IsPublic = requestDTO.IsPublic;
        }

        private void Initialize()
        {
            AccessToken = ArticleService.GenerateToken(32);
            ControlToken = ArticleService.GenerateToken(32);
            Articles = new List<ArticleDTO>();
            Comments = new List<Comment>();
            CreatedAt = ModifiedAt = DateTime.UtcNow;
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("AccessToken")]
        public string AccessToken { get; set; }
        [BsonElement("ControlToken")]
        public string ControlToken { get; set; }
        [BsonElement("Articles")]
        public IList<ArticleDTO> Articles { get; set; }
        [BsonElement("Name")]
        public string Name { get; set; }
        [BsonElement("IsPublic")]
        public bool IsPublic { get; set; }
        [BsonElement("Comments")]
        public IList<Comment> Comments { get; set; }
        [BsonElement("CreatedAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime CreatedAt { get; set; }
        [BsonElement("ModifiedAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime ModifiedAt { get; set; }
    }
    public class CollectionRequestDTO
    {
        public string Name { get; set; }
        public bool IsPublic { get; set; }
    }
    public class CollectionDTO
    {
        public string Id { get; set; }
        public string AccessToken { get; set; }
        public bool IsPublic { get; set; }
        public IList<ArticleDTO> Articles { get; set; }
        public string Name { get; set; }
        public IList<Comment> Comments { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
