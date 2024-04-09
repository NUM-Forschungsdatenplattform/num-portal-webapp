import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { CohortBuilderService } from 'src/app/core/services/cohort-builder/cohort-builder.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { mockAqlCategories } from 'src/mocks/data-mocks/aql-categories.mock'
import {
  mockAql1,
  mockAql12,
  mockAql4,
  mockAqls,
  mockAqlsToSort,
} from 'src/mocks/data-mocks/aqls.mock'
import { AqlSelectionComponent } from './aql-selection.component'

describe('AqlSelectionComponent', () => {
  let component: AqlSelectionComponent
  let fixture: ComponentFixture<AqlSelectionComponent>

  const mockCohortBuilderService = {
    pushItemToTarget: jest.fn(),
  } as unknown as CohortBuilderService

  const aqlsSubject = new Subject<IAqlApi[]>()
  const mockAqlService = {
    getAll: jest.fn(),
    filteredAqlsObservable$: aqlsSubject.asObservable(),
  } as unknown as AqlService

  const aqlsCategoriesSubject = new Subject<IAqlCategoryApi[]>()
  const mockAqlCategoryService = {
    getAll: jest.fn(),
    aqlCategoriesObservable$: aqlsCategoriesSubject.asObservable(),
  } as unknown as AqlCategoryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlSelectionComponent],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [
        { provide: CohortBuilderService, useValue: mockCohortBuilderService },
        { provide: AqlService, useValue: mockAqlService },
        { provide: AqlCategoryService, useValue: mockAqlCategoryService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockAqlCategoryService, 'getAll').mockImplementation(() => of(mockAqlCategories))
    jest.spyOn(mockAqlService, 'getAll').mockImplementation(() => of(mockAqls))
    jest.spyOn(mockCohortBuilderService, 'pushItemToTarget')
    jest.clearAllMocks()
    fixture = TestBed.createComponent(AqlSelectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On init', () => {
    it('should set the default category', () => {
      expect(component.initialCategories).toBeTruthy()
    })

    it('should subscribe to receive and group the aqls by category', (done) => {
      component.groupedAqls.subscribe((groups) => {
        expect(groups[0].aqls.length).toBeTruthy()
        expect(groups[1].aqls.length).toBeTruthy()
        expect(groups[2].aqls.length).toBeTruthy()
        expect(groups[3].aqls.length).toBeTruthy()
        expect(groups[0].aqls[0].id).toEqual(mockAql12.id)
        done()
      })
      aqlsSubject.next([mockAql4, ...mockAqlsToSort])
      aqlsCategoriesSubject.next(mockAqlCategories)
    })
  })

  describe('When an AQL is selected', () => {
    it('should push it to the builder service', () => {
      component.emitAqlEvent(mockAql1)
      expect(mockCohortBuilderService.pushItemToTarget).toHaveBeenCalledWith(
        new AqlUiModel(mockAql1)
      )
    })
  })

  describe('on language change', () => {
    it('should set the current lang and group and sort the aqls', (done) => {
      jest.spyOn(component, 'groupAndSortAql')
      const componentAny = fixture.componentInstance as any

      componentAny.translateService.onLangChange.subscribe(() => {
        expect(component.currentLang).toEqual('de')
        expect(component.groupAndSortAql).toHaveBeenCalledTimes(1)
        done()
      })

      componentAny.translateService.use('de')
    })
  })
})
