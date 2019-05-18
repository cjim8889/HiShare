using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Models
{
    public class Article
    {
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

    }
}
