using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
namespace HiShare.Models
{
    public class Collection
    {
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
        [BsonElement("Comments")]
        public IList<Comment> Comments { get; set; }
        [BsonElement("CreatedAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime CreatedAt { get; set; }
        [BsonElement("ModifiedAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime ModifiedAt { get; set; }
    }

    public class CollectionDTO
    {
        public string Id { get; set; }
        public string AccessToken { get; set; }
        public IList<ArticleDTO> Articles { get; set; }
        public string Name { get; set; }
        public IList<Comment> Comments { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
