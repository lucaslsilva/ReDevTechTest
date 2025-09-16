using ajgre_technical_interview.Models;
using ajgre_technical_interview.Services;
using Microsoft.AspNetCore.Mvc;

namespace ajgre_technical_interview.Controllers
{
    [ApiController]
    [Route("api/sanctioned-entities")]
    public class SanctionedEntitiesController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;

        public SanctionedEntitiesController(IDatabaseService databaseService)
        {
            _databaseService = databaseService;
        }


        [HttpGet]
        public async Task<IActionResult> GetSanctionedEntities()
        {
            try
            {
                var entities = await _databaseService.GetSanctionedEntitiesAsync();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }

        }

        [HttpPost]
        public async Task<IActionResult> CreateSanctionedEntity([FromBody] SanctionedEntity entity)
        {
            try
            {
                var created = await _databaseService.CreateSanctionedEntityAsync(entity);
                return CreatedAtAction(nameof(GetSanctionedEntities), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
