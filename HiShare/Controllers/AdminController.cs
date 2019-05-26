using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiShare.Attributes;
using HiShare.Repositories;
using HiShare.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace HiShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AdminService admin;

        public AdminController(IConfiguration configuration, AdminService admin)
        {
            this.admin = admin;
        }


        [Admin]
        [HttpGet("ban")]
        public async Task<IActionResult> SetArticleToPrivate([FromQuery(Name = "t")]string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return BadRequest();
            }

            if (await admin.SetArticleToPrivate(token))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}