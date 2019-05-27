using HiShare.Models;
using HiShare.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HiShare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        private readonly CollectionService collectionService;
        private readonly RecaptchaService recaptchaService;

        public CollectionsController(CollectionService collection, RecaptchaService recaptcha)
        {
            this.collectionService = collection;
            this.recaptchaService = recaptcha;
        }

        [HttpPost]
        public async Task<ActionResult<Collection>> CreateCollection([FromBody] CollectionRequestDTO requestDTO, [FromQuery(Name = "t")]string token)
        {
            //if (!await recaptcha.Authenticate(token))
            //{
            //    return BadRequest();
            //}

            if (string.IsNullOrWhiteSpace(requestDTO.Name))
            {
                return BadRequest();
            }

            var collectionObj = new Collection(requestDTO);
            await collectionService.New(collectionObj);

            return Ok(collectionObj);
        }

        [HttpGet("{controlToken}/{accessToken}")]
        public async Task<IActionResult> InsertToCollection(string controlToken, string accessToken)
        {
            if (!await collectionService.InsertTo(controlToken, accessToken))
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete("{controlToken}/{accessToken}")]
        public async Task<IActionResult> RemoveFromCollection(string controlToken, string accessToken)
        {
            if (!await collectionService.RemoveFrom(controlToken, accessToken))
            {
                return NotFound();
            }

            return Ok();
        }
        [HttpGet("{accessToken}")]
        public async Task<ActionResult<CollectionDTO>> GetCollectionsById(string accessToken)
        {
            var col = await collectionService.GetByAccessToken(accessToken);
            if (col == null)
            {
                return NotFound();
            }

            return Ok(new CollectionDTO(col));
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Collection>>> GetPublicCollections([FromQuery]int? offset)
        {
            var result = await collectionService.GetLatestPublicCollections(30, offset);
            return Ok(result);
        }
    }
}
