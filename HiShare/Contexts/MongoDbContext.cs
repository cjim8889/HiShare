using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace HiShare.Contexts
{
    public class MongoDbContext
    {
        public MongoDbContext(IConfiguration configuration)
        {
            var connectionString = !string.IsNullOrEmpty(configuration.GetSection("Db_ConnectionString").Value) ? configuration.GetSection("Db_ConnectionString").Value : configuration.GetSection("Database:ConnectionString").Value;
            
            Client = new MongoClient(connectionString);
            Database = Client.GetDatabase("HiShare");
          
        }

        public IMongoDatabase Database { get; }
        public MongoClient Client { get; }
    }
}
