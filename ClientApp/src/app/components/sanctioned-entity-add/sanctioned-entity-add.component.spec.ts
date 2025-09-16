import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { SanctionedEntityAddComponent } from './sanctioned-entity-add.component';
import { SanctionedEntitiesService } from '../../services/sanctioned-entities.service';

describe('SanctionedEntityAddComponent', () => {
  let component: SanctionedEntityAddComponent;
  let fixture: ComponentFixture<SanctionedEntityAddComponent>;
  let mockService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockService = {
      addSanctionedEntity: jasmine.createSpy('addSanctionedEntity'),
      getSanctionedEntities: jasmine
        .createSpy('getSanctionedEntities')
        .and.returnValue(of([])),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SanctionedEntityAddComponent],
      providers: [
        { provide: SanctionedEntitiesService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SanctionedEntityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as submitted and not call service if invalid', () => {
    component.addEntity();
    expect(component.formSubmitted).toBeTrue();
    expect(mockService.addSanctionedEntity).not.toHaveBeenCalled();
  });

  it('should call service and navigate on successful add', fakeAsync(() => {
    const entity = { name: 'Test', domicile: 'Earth', accepted: true };
    component.entityForm.setValue(entity);
    mockService.addSanctionedEntity.and.returnValue(of({}));

    component.addEntity();
    tick(); // simulate async

    expect(component.isSaving).toBeFalse();
    expect(mockService.addSanctionedEntity).toHaveBeenCalledWith(entity);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sanctioned-entities']);
  }));

  it('should handle error if service fails', fakeAsync(() => {
    const entity = { name: 'Test', domicile: 'Earth', accepted: true };
    component.entityForm.setValue(entity);
    const error = { message: 'Duplicate entity' };
    mockService.addSanctionedEntity.and.returnValue(throwError(() => error));

    component.addEntity();
    tick(); // simulate async

    expect(component.isSaving).toBeFalse();
    expect(component.formError).toBe('Duplicate entity');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));
});
