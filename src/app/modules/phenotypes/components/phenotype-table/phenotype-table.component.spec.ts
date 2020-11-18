import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { mockPhenotype1, mockPhenotypes } from 'src/mocks/data-mocks/phenotypes.mock'

import { PhenotypeTableComponent } from './phenotype-table.component'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

describe('PhenotypeTableComponent', () => {
  let component: PhenotypeTableComponent
  let fixture: ComponentFixture<PhenotypeTableComponent>
  let router: Router

  const phenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const phenotypeService = {
    phenotypesObservable$: phenotypesSubject$.asObservable(),
    getAll: () => of(),
  } as PhenotypeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhenotypeTableComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: PhenotypeService,
          useValue: phenotypeService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(PhenotypeTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When phenotypes are received by the component', () => {
    it('should set them into the datasource.data', () => {
      phenotypesSubject$.next(mockPhenotypes)
      fixture.detectChanges()
      expect(component.dataSource.data).toBe(mockPhenotypes)
    })
  })

  describe('When phenotype row is clicked', () => {
    it('should call the router to navigate to the editor with the id of the phenotype selected', () => {
      jest.spyOn(router, 'navigate').mockImplementation()
      component.handleRowClick(mockPhenotype1)
      expect(router.navigate).toHaveBeenCalledWith(['phenotypes', mockPhenotype1.id, 'editor'])
    })
  })
})
