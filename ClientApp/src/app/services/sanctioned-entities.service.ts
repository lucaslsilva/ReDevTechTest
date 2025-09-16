import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SanctionedEntity } from '../models/sanctioned-entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SanctionedEntitiesService {
  private readonly apiUrl: string;
  private readonly path = 'sanctioned-entities';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'api/';
  }

  public getSanctionedEntities(): Observable<SanctionedEntity[]> {
    const url = this.apiUrl + this.path;
    return this.http.get<SanctionedEntity[]>(url);
  }

  public addSanctionedEntity(entity: SanctionedEntity): Observable<void> {
    const url = this.apiUrl + this.path;
    return this.http.post<void>(url, entity);
  }
}
