/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { mockAql1, mockAql4, mockAqls, mockAqlsToSort } from 'src/mocks/data-mocks/aqls.mock'
import { AqlSelectionComponent } from './aql-selection.component'

describe('AqlSelectionComponent', () => {
  let component: AqlSelectionComponent
  let fixture: ComponentFixture<AqlSelectionComponent>

  const mockCohortBuilderService = ({
    pushItemToTarget: jest.fn(),
  } as unknown) as CohortBuilderService

  const aqlsSubject = new Subject<IAqlApi[]>()
  const mockAqlService = ({
    getAll: jest.fn(),
    aqlsObservable$: aqlsSubject.asObservable(),
  } as unknown) as AqlService

  const aqlsCategoriesSubject = new Subject<IAqlCategoryApi[]>()
  const mockAqlCategoryService = ({
    getAll: jest.fn(),
    aqlCategoriesObservable$: aqlsCategoriesSubject.asObservable(),
  } as unknown) as AqlCategoryService

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
    it('should set the default category', (done) => {
      mockAqlCategoryService.aqlCategoriesObservable$.subscribe(() => {
        expect(component.aqlCategories).toEqual(component.initialCategories)
        done()
      })
      expect(component.initialCategories).toBeTruthy()
      aqlsCategoriesSubject.next([])
    })

    it('should subscribe to receive and restructure the categories', (done) => {
      mockAqlCategoryService.aqlCategoriesObservable$.subscribe(() => {
        expect(component.aqlCategories[mockAqlCategories[0].id]).toEqual(mockAqlCategories[0].name)
        expect(component.aqlCategories[mockAqlCategories[1].id]).toEqual(mockAqlCategories[1].name)
        expect(component.aqlCategories[mockAqlCategories[2].id]).toEqual(mockAqlCategories[2].name)
        done()
      })
      aqlsCategoriesSubject.next(mockAqlCategories)
    })

    it('should subscribe to receive and group the aqls by category', (done) => {
      component.groupedAqls.subscribe((aqls) => {
        expect(aqls[0].length).toBeTruthy()
        expect(aqls[1].length).toBeTruthy()
        expect(aqls[2].length).toBeTruthy()
        expect(aqls[3].length).toBeTruthy()
        expect(aqls[0][0].id).toEqual(mockAql4.id)
        done()
      })
      aqlsSubject.next([mockAql4, ...mockAqlsToSort])
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
})
