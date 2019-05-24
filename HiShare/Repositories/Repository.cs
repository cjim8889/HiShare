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
        Task<bool> UpdateAsync<T>(UpdateDefinition<T> update, FilterDefinition<T> filter) where T : class, new();
        Task<IEnumerable<T>> ManyLimitAsync<T>(Expression<Func<T, bool>> expression, int limit, int skip) where T : class, new();
        Task<IEnumerable<T>> ManyLimitSortAsync<T>(Expression<Func<T, bool>> expression, Expression<Func<T, object>> sortExpression, int limit, int skip) where T : class, new();


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

        public async Task<bool> UpdateAsync<T>(UpdateDefinition<T> update, FilterDefinition<T> filter) where T : class, new()
        {
            var updateInfo = await dbContext.Database.GetCollection<T>(typeof(T).Name).UpdateOneAsync(filter, update);

            return updateInfo.IsAcknowledged ? updateInfo.MatchedCount > 0 : false;
        }
        public async Task<T> SingleAsync<T>(Expression<Func<T, bool>> expression) where T : class, new()
        {
            return await dbContext.Database.GetCollection<T>(typeof(T).Name).Find(expression).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> ManyLimitAsync<T>(Expression<Func<T, bool>> expression, int limit, int skip) where T : class, new()
        {
            return await dbContext.Database.GetCollection<T>(typeof(T).Name).Find(expression).Skip(skip).Limit(limit).ToListAsync();
        }

        public async Task<IEnumerable<T>> ManyLimitSortAsync<T>(Expression<Func<T, bool>> expression, Expression<Func<T, object>> sortExpression, int limit, int skip) where T : class, new()
        {
            return await dbContext.Database.GetCollection<T>(typeof(T).Name).Find(expression).SortBy(sortExpression).Skip(skip).Limit(limit).ToListAsync();
        }
    }
}
