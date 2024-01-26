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
import { BehaviorSubject, of, Subject, throwError } from 'rxjs'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlTableComponent } from './aql-table.component'
import { TranslateModule } from '@ngx-translate/core'
import { SearchComponent } from '../../../../shared/components/search/search.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { IAqlFilter } from '../../../../shared/models/aql/aql-filter.interface'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Component, EventEmitter, Input, Output, Pipe, PipeTransform } from '@angular/core'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { IFilterItem } from '../../../../shared/models/filter-chip.interface'
import { Router } from '@angular/router'
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface'
import { ProfileService } from '../../../../core/services/profile/profile.service'
import { RouterTestingModule } from '@angular/router/testing'
import { PipesModule } from '../../../../shared/pipes/pipes.module'
import { AqlMenuKeys } from './menu-item'
import { mockAql1, mockAqlsToSort } from '../../../../../mocks/data-mocks/aqls.mock'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { MatSort } from '@angular/material/sort'

describe('AqlTableComponent', () => {
  let component: AqlTableComponent
  let fixture: ComponentFixture<AqlTableComponent>
  let router: Router

  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterItem: [] })

  const aqlService = {
    delete: jest.fn(),
    getAll: () => of(),
    setFilter: (_: any) => {},
    getAllPag: () => of(),
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
  } as unknown as AqlService

  const aqlCategoriesSubject$ = new Subject<IAqlCategoryApi[]>()
  const mockAqlCategoryService = {
    aqlCategoriesObservable$: aqlCategoriesSubject$.asObservable(),
    getAll: () => of(),
  }

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  const mockToast = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  @Component({ selector: 'num-filter-chips', template: '' })
  class StubFilterChipsComponent {
    @Input() filterChips: IFilterItem<string | number>[]
    @Input() multiSelect: boolean
    @Output() selectionChange = new EventEmitter()
  }

  @Pipe({ name: 'localizedDate' })
  class MockLocalizedDatePipe implements PipeTransform {
    transform(value: number): number {
      return value
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AqlTableComponent,
        SearchComponent,
        DefinitionListStubComponent,
        StubFilterChipsComponent,
        MockLocalizedDatePipe,
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        PipesModule,
      ],
      providers: [
        {
          provide: AqlCategoryService,
          useValue: mockAqlCategoryService,
        },
        {
          provide: AqlService,
          useValue: aqlService,
        },
        {
          provide: ProfileService,
          useValue: profileService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToast,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(AqlTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(aqlService, 'setFilter')
    jest.spyOn(mockToast, 'openToast').mockImplementation()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When a menu Item is clicked', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
    })

    test.each([AqlMenuKeys.Edit, AqlMenuKeys.Clone])(
      'should call the AQL editor with the menu item key clicked',
      (menuKey: AqlMenuKeys) => {
        const aqlId = 1
        component.handleMenuClick(menuKey, aqlId)

        expect(router.navigate).toHaveBeenCalledWith(['aqls', aqlId, 'editor'])
      },
    )
  })

  describe('on language change', () => {
    it('should set the current lang', (done) => {
      const componentAny = fixture.componentInstance as any

      componentAny.translateService.onLangChange.subscribe(() => {
        done()
      })

      componentAny.sortBy = 'nameTranslated'
      componentAny.translateService.use('de')
    })
  })

  describe('On the attempt to delete the AQL', () => {
    beforeEach(() => {
      const mockAqlObservable = of(mockAql1)
      jest.spyOn(aqlService, 'delete').mockImplementation(() => mockAqlObservable)
    })

    it('should call the AQL delete method', (done) => {
      const aqlId = 1
      component.delete(aqlId).then(() => {
        expect(aqlService.delete).toHaveBeenCalledTimes(1)
        expect(mockToast.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Success,
          message: 'QUERIES.DELETE_QUERY_SUCCESS_MESSAGE',
        })
        done()
      })
    })
  })

  describe('When filter change', () => {
    it('filter change to all aql', () => {
      jest.spyOn(aqlService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig['filterItem'] = [{ id: 'QUERIES.ALL_AQLS', isSelected: true }]
      component.handleChangeFilter()
      expect(component.filters.type).toEqual(null)
    })

    it('filter change to my aql', () => {
      jest.spyOn(aqlService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig['filterItem'] = [{ id: 'QUERIES.MY_AQL', isSelected: true }]
      component.handleChangeFilter()
      expect(component.filters.type).toEqual('OWNED')
    })

    it('filter change to organization aql', () => {
      jest.spyOn(aqlService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig['filterItem'] = [{ id: 'QUERIES.ORGANIZATION_AQLS', isSelected: true }]
      component.handleChangeFilter()
      expect(component.filters.type).toEqual('ORGANIZATION')
    })
  })

  describe('When search is triggered', () => {
    it('should search', () => {
      jest.spyOn(aqlService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig.searchText = 'testSearch'
      component.handleSearchChange()
      expect(component.filters.search).toEqual('testSearch')
    })
  })

  describe('When pagination is triggered', () => {
    it('should fetch next page', () => {
      jest.spyOn(aqlService, 'getAllPag').mockReturnValue(of({}))
      const params = {
        pageIndex: 1,
        pageSize: 10,
      }
      component.onPageChange(params)
    })
  })

  describe('When sorting is triggered', () => {
    it('should fetch sorting page', () => {
      jest.spyOn(aqlService, 'getAllPag').mockReturnValue(of({}))
      const sort = new MatSort()
      sort.active = 'name'
      sort.direction = 'asc'
      component.handleSortChangeTable(sort)
    })
  })

  describe('On fail to delete the AQL', () => {
    beforeEach(() => {
      jest.spyOn(aqlService, 'delete').mockImplementation(() => throwError({}))
    })

    it('should show Error toast', (done) => {
      const aqlId = 1
      component.delete(aqlId).then(() => {
        expect(mockToast.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Error,
          message: 'QUERIES.DELETE_QUERY_ERROR_MESSAGE',
        })
        done()
      })
    })
  })
})
