using HiShare.Models;
using HiShare.Repositories;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Services
{
    public class CollectionService
    {
        private readonly IRepository repository;
        private readonly ArticleService articleService;

        public CollectionService(IRepository repository, ArticleService article)
        {
            this.repository = repository;
            this.articleService = article;
        }

        public Task New(Collection collection)
        {
            return repository.AddAsync(collection);
        }

        public Task<IEnumerable<Collection>> GetLatestPublicCollections(int? limit, int? skip)
        {
            return repository.ManyLimitSortAsync<Collection>(
                x => x.IsPublic,
                x => x.CreatedAt,
                limit.HasValue ? limit.Value : 30,
                skip.HasValue ? skip.Value : 0
                );
        }

        public async Task<bool> InsertTo(string adminToken, string accessToken)
        {
            var article = await articleService.GetByAccessToken(accessToken);
            if (article == null)
            {
                return false;
            }

            var update = Builders<Collection>.Update.AddToSet("Articles", new ArticleDTO(article));
            var filter = Builders<Collection>.Filter.Eq("AdminToken", adminToken);

            return await repository.UpdateAsync(update, filter);
        }
    }
}
