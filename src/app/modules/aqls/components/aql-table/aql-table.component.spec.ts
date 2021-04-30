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
import { Component, EventEmitter, Input, Output } from '@angular/core'
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
import { Pipe, PipeTransform } from '@angular/core'
import { MatSortHeaderHarness } from '@angular/material/sort/testing'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatTableHarness } from '@angular/material/table/testing'
import { DateHelperService } from 'src/app/core/helper/date-helper.service'

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
  class MockPipe implements PipeTransform {
    transform(value: number): number {
      // Do stuff here, if you want
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
        MockPipe,
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
          message: 'AQL.DELETE_AQL_SUCCESS_MESSAGE',
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
          message: 'AQL.DELETE_AQL_ERROR_MESSAGE',
        })
        done()
      })
    })
  })

  describe('When sorting AQL table', () => {
    let de: HTMLDivElement
    let loader: HarnessLoader
    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture)
      component.paginator.pageSize = 20
      filteredAqlsSubject$.next(mockAqlsToSort)
      fixture.detectChanges()
      de = fixture.debugElement.nativeElement
    })

    it('should sort by id descending as default', (done) => {
      const aqlWithLatestId = maxBy(mockAqlsToSort, 'id')
      const aqlWithOldestId = minBy(mockAqlsToSort, 'id')
      const tableRows = Array.from(
        de.querySelectorAll<HTMLDivElement>('[data-test="aqls__table__data__name"]')
      )

      expect(tableRows).toHaveLength(mockAqlsToSort.length)
      expect(tableRows[0].innerHTML.trim()).toEqual(aqlWithLatestId.name)
      expect(tableRows[tableRows.length - 1].innerHTML.trim()).toEqual(aqlWithOldestId.name)
      done()
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
      expect(rows.name.text[0]).toEqual('%')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('ü')
      // Sort descending
      await sortHeaderButton.click()
      rows = await table.getCellTextByColumnName()
      expect(await sortHeaderButton.getSortDirection()).toEqual('desc')
      expect(rows.name.text[0]).toEqual('ü')
      expect(rows.name.text[rows.name.text.length - 1]).toEqual('%')
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
  })
})
