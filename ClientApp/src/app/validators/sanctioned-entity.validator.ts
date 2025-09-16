import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SanctionedEntitiesService } from '../services/sanctioned-entities.service';

export function sanctionedEntityValidator(
  service: SanctionedEntitiesService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const name = control.get('name')?.value;
    const domicile = control.get('domicile')?.value;

    // Skip validation if name or domicile is missing
    if (!name || !domicile) {
      return of(null);
    }

    return service.getSanctionedEntities().pipe(
      map((entities) => {
        const exists = entities.some(
          (e) =>
            e.name.toLowerCase() === name.toLowerCase() &&
            e.domicile.toLowerCase() === domicile.toLowerCase()
        );
        return exists ? { duplicateEntity: true } : null;
      })
    );
  };
}
