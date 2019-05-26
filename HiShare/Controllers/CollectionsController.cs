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

        public CollectionsController(CollectionService collection)
        {
            this.collection = collection;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCollection([FromBody] )
        {

        }
    }
}
