import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SanctionedEntity } from '../../models/sanctioned-entity';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';
import { sanctionedEntityValidator } from 'src/app/validators/sanctioned-entity.validator';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sanctioned-entity-add',
  templateUrl: './sanctioned-entity-add.component.html',
})
export class SanctionedEntityAddComponent {
  public entityForm: FormGroup;
  public formSubmitted = false;
  public formError = '';
  public isSaving = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly entitiesService: SanctionedEntitiesService
  ) {
    this.entityForm = this.fb.group(
      {
        name: ['', Validators.required],
        domicile: ['', Validators.required],
        accepted: [false],
      },
      {
        asyncValidators: [sanctionedEntityValidator(this.entitiesService)],
        updateOn: 'blur',
      }
    );
  }

  public addEntity(): void {
    this.formSubmitted = true;
    this.formError = '';

    if (this.entityForm.invalid) return;

    this.isSaving = true;

    const newEntity: SanctionedEntity = this.entityForm.value;

    this.entitiesService
      .addSanctionedEntity(newEntity)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/sanctioned-entities']);
        },
        error: (err) => {
          this.isSaving = false;
          this.formError = err.message || 'Failed to add entity';
        },
      });
  }
}
