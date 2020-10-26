import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { IAql } from 'src/app/core/models/aql.interface';
import { AqlService } from 'src/app/core/services/aql.service';
import { MaterialModule } from 'src/app/layout/material/material.module';
import { AqlTableComponent } from '../aql-table/aql-table.component';

import { AqlsComponent } from './aqls.component';

describe('AqlsComponent', () => {
  let component: AqlsComponent;
  let fixture: ComponentFixture<AqlsComponent>;

  const aqlsSubject$ = new Subject<IAql[]>();
  const aqlService = {
    aqlsObservable$: aqlsSubject$.asObservable(),
    getAll: () => of(),
  } as AqlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqlsComponent, AqlTableComponent ],
      imports: [
        MaterialModule
      ],
      providers: [{
        provide: AqlService, useValue: aqlService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
