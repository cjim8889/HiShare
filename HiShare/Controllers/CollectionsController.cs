using HiShare.Models;
using HiShare.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        private readonly CollectionService collection;
        private readonly RecaptchaService recaptcha;

        public CollectionsController(CollectionService collection, RecaptchaService recaptcha)
        {
            this.collection = collection;
            this.recaptcha = recaptcha;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCollection([FromBody] CollectionRequestDTO requestDTO, [FromQuery(Name = "t")]string token)
        {
            if (!await recaptcha.Authenticate(token))
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(requestDTO.Name))
            {
                return BadRequest();
            }

            var collectionObj = new Collection(requestDTO);
            await collection.New(collectionObj);

            return Ok(collectionObj);
        }

        [HttpGet("{adminToken}/{accessToken}")]
        public async Task<IActionResult> InsertToCollection(string adminToken, string accessToken)
        {
            if (!await collection.InsertTo(adminToken, accessToken))
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetPublicCollections([FromQuery]int? offset)
        {
            var result = await collection.GetLatestPublicCollections(30, offset);
            return Ok(result);
        }
    }
}
