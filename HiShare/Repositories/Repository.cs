using HiShare.Contexts;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HiShare.Repositories
{
    public interface IRepository
    {
        Task DeleteAsync<T>(Expression<Func<T, bool>> expression) where T : class, new();
        Task<T> SingleAsync<T>(Expression<Func<T, bool>> expression) where T : class, new();
        Task<IEnumerable<T>> ManyAsync<T>(Expression<Func<T, bool>> expression) where T : class, new();
        Task AddAsync<T>(T item) where T : class, new();
        Task AddAsync<T>(IEnumerable<T> items) where T : class, new();
    }
    public class MongoRepository : IRepository
    {
        private readonly MongoDbContext dbContext;
        public MongoRepository(MongoDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task AddAsync<T>(T item) where T : class, new()
        {
            await dbContext.Database.GetCollection<T>(typeof(T).Name).InsertOneAsync(item);
        }

        public async Task AddAsync<T>(IEnumerable<T> items) where T : class, new()
        {
            await dbContext.Database.GetCollection<T>(typeof(T).Name).InsertManyAsync(items);
        }

        public async Task DeleteAsync<T>(Expression<Func<T, bool>> expression) where T : class, new()
        {
            await dbContext.Database.GetCollection<T>(typeof(T).Name).DeleteOneAsync(expression);
        }

        public async Task<IEnumerable<T>> ManyAsync<T>(Expression<Func<T, bool>> expression) where T : class, new()
        {
            return await dbContext.Database.GetCollection<T>(typeof(T).Name).Find(expression).ToListAsync();
        }

        public async Task<T> SingleAsync<T>(Expression<Func<T, bool>> expression) where T : class, new()
        {
            return await dbContext.Database.GetCollection<T>(typeof(T).Name).Find(expression).FirstOrDefaultAsync();
        }
    }
}
