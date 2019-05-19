using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiShare.Repositories;
using HiShare.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HiShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ArticleService article;

        public ArticleController(ArticleService article)
        {
            this.article = article;
        }

        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            Console.WriteLine("meimaotai");
            return Ok(await article.All());
        }
    }
}