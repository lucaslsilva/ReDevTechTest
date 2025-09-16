using ajgre_technical_interview.Models;

namespace ajgre_technical_interview.Validators
{
    public interface ISanctionedEntityValidator
    {
        Task ValidateAsync(SanctionedEntity entity, IEnumerable<SanctionedEntity> existingEntities);
    }
}
