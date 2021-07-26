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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import { maxBy, minBy } from 'lodash-es'
import { MatSortHeaderHarness } from '@angular/material/sort/testing'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatTableHarness } from '@angular/material/table/testing'
import { DateHelperService } from 'src/app/core/helper/date-helper.service'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { mockAqlCategories } from 'src/mocks/data-mocks/aql-categories.mock'

describe('AqlTableComponent', () => {
  let component: AqlTableComponent
  let fixture: ComponentFixture<AqlTableComponent>
  let router: Router

  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterItem: [] })

  const aqlService = ({
    delete: jest.fn(),
    getAll: () => of(),
    setFilter: (_: any) => {},
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
  } as unknown) as AqlService

  const aqlCategoriesSubject$ = new Subject<IAqlCategoryApi[]>()
  const mockAqlCategoryService = {
    aqlCategoriesObservable$: aqlCategoriesSubject$.asObservable(),
    getAll: () => of(),
  }

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  const mockToast = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

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
        BrowserAnimationsModule,
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

  it('should set the filter in the aqlService on searchChange', () => {
    component.handleSearchChange()
    expect(aqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should set the filter in the aqlService on filterChange', () => {
    component.handleFilterChange()
    expect(aqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
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
      }
    )
  })

  describe('On the attempt to delete the AQL', () => {
    beforeEach(() => {
      const mockAqlObservable = of(mockAql1)
      jest.spyOn(aqlService, 'delete').mockImplementation(() => mockAqlObservable)
    })

    it('should call the AQL delete method', async (done) => {
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

  describe('On fail to delete the AQL', () => {
    beforeEach(() => {
      jest.spyOn(aqlService, 'delete').mockImplementation(() => throwError({}))
    })

    it('should show Error toast', async (done) => {
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

  describe('When sorting AQL table', () => {
    let loader: HarnessLoader
    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture)
      component.paginator.pageSize = 20
      filteredAqlsSubject$.next(mockAqlsToSort)
      aqlCategoriesSubject$.next(mockAqlCategories)
      fixture.detectChanges()
    })

    it('should sort by id descending as default', async () => {
      const aqlWithLatestId = maxBy(mockAqlsToSort, 'id')
      const aqlWithOldestId = minBy(mockAqlsToSort, 'id')
      const table = await loader.getHarness(MatTableHarness)
      const rows = await table.getCellTextByColumnName()

      expect(rows.name.text).toHaveLength(mockAqlsToSort.length)
      expect(rows.name.text[0]).toEqual(aqlWithLatestId.name)
      expect(rows.name.text[rows.name.text.length - 1]).toEqual(aqlWithOldestId.name)
    })

    it('should be able to sort by name', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      let rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      expect(rows.name.text[0]).toEqual('')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('ü')
      // Sort descending
      await sortHeaderButton.click()
      rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      expect(rows.name.text[0]).toEqual('ü')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('')
    })

    it('should be able to sort by author', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-author' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      let rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      expect(rows.author.text[0]).toEqual('Marianne Musterfrau')
      expect(rows.author.text[rows.author.text.length - 1]).toEqual(
        'user1-firstname user1-lastname'
      )
      // Sort descending
      await sortHeaderButton.click()
      rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      expect(rows.author.text[0]).toEqual('user1-firstname user1-lastname')
      expect(rows.author.text[rows.author.text.length - 1]).toEqual('Marianne Musterfrau')
    })

    it('should be able to sort by creationDate', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-creationDate' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      let rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      expect(rows.creationDate.text[0]).toEqual('2020-01-01')
      expect(rows.creationDate.text[rows.creationDate.text.length - 1]).toEqual(
        DateHelperService.getDateString(new Date())
      )
      // Sort descending
      await sortHeaderButton.click()
      rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      expect(rows.creationDate.text[0]).toEqual(DateHelperService.getDateString(new Date()))
      expect(rows.creationDate.text[rows.creationDate.text.length - 1]).toEqual('2020-01-01')
    })

    it('should be able to sort by organization', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-organization' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      let rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      expect(rows.organization.text[0]).toEqual('abc')
      expect(rows.organization.text[rows.organization.text.length - 1]).toEqual('name1')
      // Sort descending
      await sortHeaderButton.click()
      rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      expect(rows.organization.text[0]).toEqual('name1')
      expect(rows.organization.text[rows.organization.text.length - 1]).toEqual('abc')
    })

    it('should sort by id in same order for equal elements', async () => {
      // Show ID column
      component.displayedColumns.push('id')
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-author' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      let rows = await table.getCellTextByColumnName()
      expect(rows.author.text).toHaveLength(mockAqlsToSort.length)
      let firstIdx = rows.author.text.findIndex((txt) => 'Max Mustermann' === txt)
      expect(rows.author.text[firstIdx + 1]).toEqual('Max Mustermann')
      let firstId = parseInt(rows.id.text[firstIdx], 10)
      let secondId = parseInt(rows.id.text[firstIdx + 1], 10)
      expect(firstId).toBeLessThan(secondId)
      // Sort descending
      await sortHeaderButton.click()
      rows = await table.getCellTextByColumnName()
      firstIdx = rows.author.text.findIndex((txt) => 'Max Mustermann' === txt)
      expect(rows.author.text[firstIdx + 1]).toEqual('Max Mustermann')
      firstId = parseInt(rows.id.text[firstIdx], 10)
      secondId = parseInt(rows.id.text[firstIdx + 1], 10)
      expect(firstId).toBeGreaterThan(secondId)
    })

    it('should sort string values in order empty -> special characters -> numbers -> alphabetical', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-name' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Sort ascending
      await sortHeaderButton.click()
      const rows = await table.getCellTextByColumnName()
      const firstIdx = rows.name.text.findIndex((txt) => '' === txt)
      expect(rows.name.text[firstIdx + 1]).toEqual('%')
      expect(rows.name.text[firstIdx + 2]).toEqual('1')
      expect(rows.name.text[firstIdx + 3]).toEqual('a')
    })

    it('should sort by id descending again if sort has been unchecked again', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-author' })
      )
      // Ascending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      expect(await sortHeaderButton.isActive()).toBe(true)
      // Descending
      await sortHeaderButton.click()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      expect(await sortHeaderButton.isActive()).toBe(true)
      // No sorting
      await sortHeaderButton.click()
      expect(await sortHeaderButton.isActive()).toBe(false)
      expect(component.dataSource.sort.active).toEqual('id')
      expect(component.dataSource.sort.direction).toEqual('desc')
    })

    it('should be able to sort by category', async () => {
      const sortHeaderButton = await loader.getHarness(
        MatSortHeaderHarness.with({ selector: '.mat-column-category' })
      )
      const table = await loader.getHarness(MatTableHarness)
      // Ascending
      await sortHeaderButton.click()
      let rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('asc')
      expect(rows.category.text[0]).toEqual('Demographic')
      expect(rows.category.text[rows.category.text.length - 1]).toEqual('Social')
      // Descending
      await sortHeaderButton.click()
      rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      expect(rows.category.text[0]).toEqual('Social')
      expect(rows.category.text[rows.category.text.length - 1]).toEqual('Demographic')
    })
  })
})
