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

import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { DialogAddResearchersComponent } from './dialog-add-researchers.component'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { mockUsers2 } from 'src/mocks/data-mocks/admin.mock'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { IFilterItem } from 'src/app/shared/models/filter-chip.interface'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

describe('DialogAddResearchersComponent', () => {
  let component: DialogAddResearchersComponent
  let fixture: ComponentFixture<DialogAddResearchersComponent>

  const selectedItemsChangeEmitter = new EventEmitter<IUser[]>()

  @Component({ selector: 'num-filter-table', template: '' })
  class FilterTableStubComponent {
    @Input() dataSource: MatTableDataSource<IUser>
    @Input() identifierName: string
    @Input() columnKeys: string[]
    @Input() columnPaths: string[][]
    @Input() selectedItems: IUser[]
    @Output() selectedItemsChange = selectedItemsChangeEmitter
    @Input() idOfHighlightedRow: string | number
  }

  @Component({ selector: 'num-filter-chips', template: '' })
  class StubFilterChipsComponent {
    @Input() filterChips: IFilterItem<string | number>[]
    @Input() multiSelect: boolean
    @Output() selectionChange = new EventEmitter()
  }

  const filteredApprovedUsersSubject$ = new Subject<IUser[]>()
  const filterConfigSubject$ = new BehaviorSubject<IUserFilter>({ searchText: '', filterItem: [] })

  const adminService = {
    filteredApprovedUsersObservable$: filteredApprovedUsersSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    setFilter: (_: any) => {},

    getApprovedUsers: () => of(),
    getAllPag: () => of(),
  } as unknown as AdminService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogAddResearchersComponent,
        SearchComponent,
        FilterTableStubComponent,
        StubFilterChipsComponent,
      ],
      imports: [
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PipesModule,
      ],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddResearchersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(adminService, 'setFilter')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When search is triggered', () => {
    it('should search', () => {
      jest.spyOn(adminService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig.searchText = 'testSearch'
      component.handleSearchChange()
      expect(component.filters.search).toEqual('testSearch')
    })
  })

  describe('When filter type is triggered', () => {
    it('should filter', () => {
      jest.spyOn(adminService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig.filterItem = [
        {
          id: null,
          title: 'test',
          isSelected: true,
        },
        {
          id: null,
          title: 'foo',
          isSelected: false,
        },
        {
          id: null,
          title: 'bar',
          isSelected: false,
        },
        {
          id: null,
          title: 'active',
          isSelected: false,
        },
      ]
      component.handleFilterChange(false)
      expect(component.filters.type).toEqual(null)
    })
  })

  describe('When filter type is triggered part 2', () => {
    it('should filter', () => {
      jest.spyOn(adminService, 'getAllPag').mockReturnValue(of({}))
      component.filterConfig.filterItem = [
        {
          id: null,
          title: 'test',
          isSelected: true,
        },
        {
          id: null,
          title: 'foo',
          isSelected: true,
        },
        {
          id: null,
          title: 'bar',
          isSelected: false,
        },
        {
          id: null,
          title: 'active',
          isSelected: true,
        },
      ]
      component.handleFilterChange(false)
      expect(component.filters.type).toEqual(null)
    })
  })

  describe('When pagination is triggered', () => {
    it('should fetch next page', () => {
      jest.spyOn(adminService, 'getAllPag').mockReturnValue(of({}))
      const params = {
        pageIndex: 1,
        pageSize: 10,
      }
      component.onPageChange(params)
    })
  })

  describe('When approved users are received by the component', () => {
    it('should set the researchers into the datasource.data', () => {
      filteredApprovedUsersSubject$.next(mockUsers2)
      fixture.detectChanges()
    })
  })
})
