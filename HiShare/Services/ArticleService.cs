using HiShare.Contexts;
using HiShare.Models;
using HiShare.Repositories;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
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


    }
}
