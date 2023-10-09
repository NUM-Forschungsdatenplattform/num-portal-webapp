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
import { of, Subject, throwError } from 'rxjs'
import { AqlCategoriesTableComponent } from '../aql-categories-table.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import {
  mockAqlCategories,
  mockAqlCategory1,
  mockAqlCategory2,
} from 'src/mocks/data-mocks/aql-categories.mock'
import { maxBy, minBy } from 'lodash-es'
import { MatTableHarness } from '@angular/material/table/testing'
import { MatSortHeaderHarness } from '@angular/material/sort/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { AqlCategoriesTableHarness } from './aql-categories-table.harness'
import { DELETE_AQL_CATEGORY_DIALOG_CONFIG } from '../constants'
import { AqlCategoryMenuKeys } from '../menu-item'
import { MatSort } from '@angular/material/sort'
import { AqlCategoryService } from 'projects/num-lib/src/lib/core/services/aql-category/aql-category.service'
import { DialogService } from 'projects/num-lib/src/lib/core/services/dialog/dialog.service'
import { ToastMessageService } from 'projects/num-lib/src/lib/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { IAqlCategoryApi } from 'projects/num-lib/src/lib/shared/models/aql/category/aql-category.interface'
import { DialogConfig } from 'projects/num-lib/src/lib/shared/models/dialog/dialog-config.interface'
import { ToastMessageType } from 'projects/num-lib/src/lib/shared/models/toast-message-type.enum'

describe('AqlCategoriesTableComponent', () => {
  let component: AqlCategoriesTableComponent
  let fixture: ComponentFixture<AqlCategoriesTableComponent>

  const aqlCategoriesSubject$ = new Subject<IAqlCategoryApi[]>()

  const mockAqlCategoryService = {
    delete: jest.fn(),
    getAll: () => of(),
    getAllPag: () => of(),
    aqlCategoriesObservable$: aqlCategoriesSubject$.asObservable(),
    update: jest.fn(),
  } as unknown as AqlCategoryService

  const mockToast = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlCategoriesTableComponent],
      imports: [
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: AqlCategoryService,
          useValue: mockAqlCategoryService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToast,
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
    fixture = TestBed.createComponent(AqlCategoriesTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When pagination is triggered', () => {
    it('should fetch next page', () => {
      jest.spyOn(mockAqlCategoryService, 'getAllPag').mockReturnValue(of({}))
      const params = {
        pageIndex: 1,
        pageSize: 10,
      }
      component.onPageChange(params)
    })
  })

  describe('When sorting is triggered', () => {
    it('should fetch sorting page', () => {
      jest.spyOn(mockAqlCategoryService, 'getAllPag').mockReturnValue(of({}))
      const sort = new MatSort()
      sort.active = 'name'
      sort.direction = 'asc'
      component.handleSortChangeTable(sort)
    })
  })

  describe('On the attempt to delete the AQL', () => {
    const dialogConfig: DialogConfig = {
      ...DELETE_AQL_CATEGORY_DIALOG_CONFIG,
    }

    beforeEach(async () => {
      const mockAqlCategoriesObservable = of(mockAqlCategories)
      jest
        .spyOn(mockAqlCategoryService, 'delete')
        .mockImplementation(() => mockAqlCategoriesObservable)
    })

    it('should call the AQL delete method', async () => {
      const aqlCategoryId = 1
      await component.delete(aqlCategoryId)
      expect(mockAqlCategoryService.delete).toHaveBeenCalledTimes(1)
      expect(mockToast.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Success,
        message: 'QUERY_CATEGORIES.DELETE_SUCCESS_MESSAGE',
      })
    })

    it('should open the confirm dialog', () => {
      component.handleMenuClick(AqlCategoryMenuKeys.Delete, mockAqlCategory1)
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })

    it('should do nothing if user click cancel in dialog', () => {
      component.handleMenuClick(AqlCategoryMenuKeys.Delete, mockAqlCategory1)
      afterClosedSubject$.next(false)
    })

    it('should call delete of category service on user confirmation', () => {
      component.handleMenuClick(AqlCategoryMenuKeys.Delete, mockAqlCategory2)
      afterClosedSubject$.next(true)
      expect(mockAqlCategoryService.delete).toHaveBeenCalledWith(mockAqlCategory2.id)
    })
  })

  describe('On fail to delete the AQL', () => {
    beforeEach(() => {
      jest.spyOn(mockAqlCategoryService, 'delete').mockImplementation(() => throwError({}))
    })

    it('should show Error toast', async () => {
      const aqlCategoryId = 1
      await component.delete(aqlCategoryId)
      expect(mockToast.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Error,
        message: 'QUERY_CATEGORIES.DELETE_ERROR_MESSAGE',
      })
    })
  })

  describe('On attempt to update an AQL category', () => {
    beforeEach(() => {
      jest.spyOn(component.openEditDialog, 'emit')
    })

    it('should open the dialog to edit the category', () => {
      component.handleMenuClick(AqlCategoryMenuKeys.Edit, mockAqlCategory2)
      expect(component.openEditDialog.emit).toHaveBeenCalledWith(mockAqlCategory2)
    })
  })
})
