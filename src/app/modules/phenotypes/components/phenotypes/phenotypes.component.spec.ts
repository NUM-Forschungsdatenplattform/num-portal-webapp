import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { PhenotypesComponent } from './phenotypes.component'
import { Component } from '@angular/core'

describe('PhenotypesComponent', () => {
  let component: PhenotypesComponent
  let fixture: ComponentFixture<PhenotypesComponent>

  const phenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const phenotypeService = {
    phenotypesObservable$: phenotypesSubject$.asObservable(),
    getAll: () => of(),
  } as PhenotypeService

  @Component({ selector: 'num-phenotype-table', template: '' })
  class PhenotypeTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhenotypesComponent, PhenotypeTableStubComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: PhenotypeService,
          useValue: phenotypeService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
