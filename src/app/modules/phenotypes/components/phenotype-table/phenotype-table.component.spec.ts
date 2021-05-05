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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject, throwError } from 'rxjs'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { mockPhenotype1, mockPhenotypes } from 'src/mocks/data-mocks/phenotypes.mock'

import { PhenotypeTableComponent } from './phenotype-table.component'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { PhenotypeMenuKeys } from './menu-item'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { DELETE_APPROVAL_DIALOG_CONFIG } from './constants'
import { IFilterItem } from 'src/app/shared/models/filter-chip.interface'

describe('PhenotypeTableComponent', () => {
  let component: PhenotypeTableComponent
  let fixture: ComponentFixture<PhenotypeTableComponent>
  let router: Router

  const filteredPhenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IPhenotypeFilter>({
    searchText: '',
    filterItem: [],
  })

  const phenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const phenotypeService = ({
    phenotypesObservable$: phenotypesSubject$.asObservable(),
    delete: jest.fn(),
    getAll: () => of(),
    setFilter: (_: any) => {},
    filteredPhenotypesObservable$: filteredPhenotypesSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
  } as unknown) as PhenotypeService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  const mockToastMessageService = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  @Component({ selector: 'num-filter-chips', template: '' })
  class StubFilterChipsComponent {
    @Input() filterChips: IFilterItem<string | number>[]
    @Input() multiSelect: boolean
    @Output() selectionChange = new EventEmitter()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhenotypeTableComponent, SearchComponent, StubFilterChipsComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        PipesModule,
      ],
      providers: [
        {
          provide: PhenotypeService,
          useValue: phenotypeService,
        },
        {
          provide: ProfileService,
          useValue: profileService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(PhenotypeTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(phenotypeService, 'setFilter')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the filter in the phenotypeService on searchChange', () => {
    component.handleSearchChange()
    expect(phenotypeService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should set the filter in the phenotypeService on filterChange', () => {
    component.handleFilterChange()
    expect(phenotypeService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  describe('When phenotypes are received by the component', () => {
    it('should set them into the datasource.data', () => {
      filteredPhenotypesSubject$.next(mockPhenotypes)
      fixture.detectChanges()
      expect(component.dataSource.data).toBe(mockPhenotypes)
    })
  })

  describe('When a phenotype is supposed to be cloned', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
    })

    it('should call the phenotype editor with the id of the phenotype', () => {
      const phenotypeId = 1
      const menuKey = PhenotypeMenuKeys.Clone
      component.handleMenuClick(menuKey, phenotypeId)

      expect(router.navigate).toHaveBeenCalledWith(['phenotypes', phenotypeId, 'editor'])
    })
  })

  describe('When a phenotype is supposed to be cloned', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
    })

    it('should call the phenotype editor with the id of the phenotype', () => {
      const phenotypeId = 1
      const menuKey = PhenotypeMenuKeys.Clone
      component.handleMenuClick(menuKey, phenotypeId)

      expect(router.navigate).toHaveBeenCalledWith(['phenotypes', phenotypeId, 'editor'])
    })
  })

  describe('When a phenotype is supposed to be deleted', () => {
    beforeEach(() => {
      const mockPhenotypeObservable = of(mockPhenotype1)
      jest.spyOn(phenotypeService, 'delete').mockImplementation(() => mockPhenotypeObservable)
    })

    it('should open the confirmation dialog', () => {
      const phenotypeId = 1
      const menuKey = PhenotypeMenuKeys.Delete
      component.handleMenuClick(menuKey, phenotypeId)

      expect(mockDialogService.openDialog).toHaveBeenCalledWith(DELETE_APPROVAL_DIALOG_CONFIG)
      afterClosedSubject$.next(true)

      expect(phenotypeService.delete).toHaveBeenCalledWith(phenotypeId)
    })
  })

  describe('On the attempt to delete the phenotype', () => {
    beforeEach(() => {
      const mockPhenotypeObservable = of(mockPhenotype1)
      jest.spyOn(phenotypeService, 'delete').mockImplementation(() => mockPhenotypeObservable)
    })

    it('should call the delete method of the phenotype service', async (done) => {
      const phenotypeId = 1
      component.delete(phenotypeId).then(() => {
        expect(phenotypeService.delete).toHaveBeenCalledTimes(1)
        expect(mockToastMessageService.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Success,
          message: 'PHENOTYPE.DELETE_PHENOTYPE_SUCCESS_MESSAGE',
        })
        done()
      })
    })
  })

  describe('On fail to delete the phenotype', () => {
    beforeEach(() => {
      jest.spyOn(phenotypeService, 'delete').mockImplementation(() => throwError({}))
    })

    it('should show Error toast', async (done) => {
      const phenotypeId = 1
      component.delete(phenotypeId).then(() => {
        expect(mockToastMessageService.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Error,
          message: 'PHENOTYPE.DELETE_PHENOTYPE_ERROR_MESSAGE',
        })
        done()
      })
    })
  })
})
