using HiShare.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Services
{
    public class CollectionService
    {
        private readonly IRepository repository;

        public CollectionService(IRepository repository)
        {
            this.repository = repository;
        }
    }
}
