using ajgre_technical_interview.Models;

namespace ajgre_technical_interview.Validators
{
    public class SanctionedEntityValidator : ISanctionedEntityValidator
    {
        public Task ValidateAsync(SanctionedEntity entity, IEnumerable<SanctionedEntity> existingEntities)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            if (string.IsNullOrWhiteSpace(entity.Name))
                throw new ArgumentException("Name is required.");

            if (string.IsNullOrWhiteSpace(entity.Domicile))
                throw new ArgumentException("Domicile is required.");

            if (existingEntities.Any(e =>
                e.Name.Equals(entity.Name, StringComparison.OrdinalIgnoreCase) &&
                e.Domicile.Equals(entity.Domicile, StringComparison.OrdinalIgnoreCase)))
            {
                throw new InvalidOperationException("An entity with the same Name and Domicile already exists.");
            }

            return Task.CompletedTask;
        }
    }
}
