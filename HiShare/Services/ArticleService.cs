using HiShare.Contexts;
using HiShare.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Services
{
    public class ArticleService
    {
        private readonly IDbContext<Article> dbContext;
        public ArticleService(IConfiguration configuration, IDbContext<Article> dbContext)
        {
            this.dbContext = dbContext;
        }


    }
}
