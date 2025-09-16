import { Component } from '@angular/core';
import { SanctionedEntity } from '../../models/sanctioned-entity';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sanctioned-entities',
  templateUrl: './sanctioned-entities.component.html',
})
export class SanctionedEntitiesComponent {
  public entities$: Observable<SanctionedEntity[]> =
    this.entitiesService.getSanctionedEntities();

  constructor(private entitiesService: SanctionedEntitiesService) {}
}
