using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiShare.Models;
using HiShare.Repositories;
using HiShare.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HiShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly ArticleService articleService;
        private readonly RecaptchaService recaptcha;

        public ArticlesController(ArticleService article, RecaptchaService recaptcha)
        {
            this.articleService = article;
            this.recaptcha = recaptcha;
        }

        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            return Ok(await articleService.All());
        }

        [HttpGet("{token}")]
        public async Task<IActionResult> GetArticle(string token)
        {
            var article = await articleService.GetByAccessToken(token);
            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        [HttpPost]
        public async Task<IActionResult> CreateArticle([FromBody]Article article, [FromQuery(Name = "t")]string token)
        {
            if (!await recaptcha.Authenticate(token))
            {
                return BadRequest();
            }


            await articleService.New(article);
            return CreatedAtAction("CreateArticle", article);
        }

        [HttpPost("{token}/comment")]
        public async Task<IActionResult> InsertComment(string token, [FromQuery(Name = "t")]string recaptchaToken, [FromBody]Comment comment)
        {
            if (!await recaptcha.Authenticate(recaptchaToken))
            {
                return BadRequest();
            }

            if (!await articleService.InsertCommentByAccessToken(token, comment))
            {
                return BadRequest();
            }

            return Ok(comment);
        }
    }
}