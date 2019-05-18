using HiShare.Contexts;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Services
{
    public class DbService
    {
        private readonly IDbContext dbContext;
        public DbService(IConfiguration configuration, IDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


    }
}
