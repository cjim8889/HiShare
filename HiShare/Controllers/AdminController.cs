using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiShare.Attributes;
using HiShare.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace HiShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IRepository repository;
        public AdminController(IConfiguration configuration, IRepository repository)
        {
            this.repository = repository;
        }


        [Admin]
        public IActionResult SetArticleToPrivate([FromQuery(Name = "t")]string token)
        {
            return Ok("nihao");
        }
    }
}