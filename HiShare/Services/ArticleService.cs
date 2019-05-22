using HiShare.Contexts;
using HiShare.Models;
using HiShare.Repositories;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace HiShare.Services
{
    public class ArticleService
    {
        private readonly IRepository repository;
        public ArticleService(IConfiguration configuration, IRepository repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<Article>> All()
        {
            return await repository.ManyAsync<Article>(a => true);
        }

        public async Task New(Article article)
        {
            await repository.AddAsync<Article>(article);
        }

        public async Task<Article> GetByAccessToken(string token)
        {
            return await repository.SingleAsync<Article>(x => x.AccessToken == token);
        }

        public async Task<bool> InsertCommentByAccessToken(string token, Comment comment)
        {
            var update = Builders<Article>.Update.Push<Comment>("Comments", comment);
            var filter = Builders<Article>.Filter.Eq("AccessToken", token);

            return await repository.UpdateAsync(update, filter);
        }

        public static string GenerateToken(int length)
        {
            string token;

            using (RandomNumberGenerator rng = new RNGCryptoServiceProvider())
            {
                byte[] TokenData = new byte[length];

                rng.GetBytes(TokenData);

                token = WebEncoders.Base64UrlEncode(TokenData);
            }

            return token;
        }

    }
}
