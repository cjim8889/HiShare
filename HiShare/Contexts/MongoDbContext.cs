using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Contexts
{
    public class MongoDbContext
    {
        public MongoDbContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetSection("Db_ConnectionString").Value;

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                connectionString = configuration.GetSection("Database:ConnectionString").Value;
            }

            
            Client = new MongoClient(configuration.GetSection("Db_ConnectionString").Value);
            Database = Client.GetDatabase("HiShare");
          
        }

        public IMongoDatabase Database { get; }
        public MongoClient Client { get; }
    }
}
