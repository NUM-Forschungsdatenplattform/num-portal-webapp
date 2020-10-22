import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { IPhenotype } from 'src/app/core/models/phenotype.interface';
import { PhenotypeService } from 'src/app/core/services/phenotype.service';
import { MaterialModule } from 'src/app/layout/material/material.module';

import { PhenotypeTableComponent } from './phenotype-table.component';

describe('PhenotypeTableComponent', () => {
  let component: PhenotypeTableComponent;
  let fixture: ComponentFixture<PhenotypeTableComponent>;

  const phenotypesSubject$ = new Subject<IPhenotype[]>();
  const phenotypeService = {
    phenotypesObservable$: phenotypesSubject$.asObservable(),
    getAll: () => of()
  } as PhenotypeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhenotypeTableComponent ],
      imports: [
        MaterialModule,
      ],
      providers: [{
        provide: PhenotypeService, useValue: phenotypeService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
