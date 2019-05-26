using HiShare.Models;
using HiShare.Repositories;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Services
{
    public class AdminService
    {
        private readonly IRepository repository;
        public AdminService(IConfiguration configuration, IRepository repository)
        {
            this.repository = repository;
        }

        public Task<bool> SetArticleToPrivate(string accessToken)
        {
            var update = Builders<Article>.Update.Set("IsPublic", false);
            var filter = Builders<Article>.Filter.Eq("AccessToken", accessToken);

            return repository.UpdateAsync<Article>(update, filter);
        }

        public Task<bool> DeleteArticle(string accessToken)
        {
            return repository.DeleteAsync<Article>(x => x.AccessToken == accessToken);
        }
    }
}
