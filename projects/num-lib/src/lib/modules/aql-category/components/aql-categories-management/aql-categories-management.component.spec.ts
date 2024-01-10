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
import { of, Subject, throwError } from 'rxjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AqlCategoriesManagementComponent } from './aql-categories-management.component'
import {
  mockAqlCategories,
  mockAqlCategory1,
  mockAqlCategory2,
  mockAqlCategory3,
} from 'src/mocks/data-mocks/aql-categories.mock'
import { EDIT_AQL_CATEGORY_DIALOG_CONFIG } from './constants'
import { AqlCategoriesTableComponent } from '../aql-categories-table/aql-categories-table.component'
import { mockManagerUserProfile } from 'src/mocks/data-mocks/user-profile.mock'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { LayoutModule } from '@angular/cdk/layout'
import { AuthService } from '../../../../core/auth/auth.service'
import { AqlCategoryService } from '../../../../core/services/aql-category/aql-category.service'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { ProfileService } from '../../../../core/services/profile/profile.service'
import { ToastMessageService } from '../../../../core/services/toast-message/toast-message.service'
import { IAqlCategoryApi } from '../../../../shared/models/aql/category/aql-category.interface'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { ToastMessageType } from '../../../../shared/models/toast-message-type.enum'
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface'
import { SharedModule } from '../../../../shared/shared.module'

describe('AqlCategoriesManagementComponent', () => {
  let component: AqlCategoriesManagementComponent
  let fixture: ComponentFixture<AqlCategoriesManagementComponent>

  const aqlCategoriesSubject$ = new Subject<IAqlCategoryApi[]>()

  const mockAqlCategoryService = {
    delete: jest.fn(),
    getAll: jest.fn(() => of()),
    update: jest.fn(),
    save: jest.fn(),
    getAllPag: () => of(),
    aqlCategoriesObservable$: aqlCategoriesSubject$.asObservable(),
  } as unknown as AqlCategoryService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const mockProfileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown as ProfileService

  const userInfoSubject$ = new Subject<any>()
  const mockAuthService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const mockToastService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const afterClosedSubject$ = new Subject<Omit<IAqlCategoryApi, 'id'> | void>()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlCategoriesManagementComponent, AqlCategoriesTableComponent],
      imports: [
        BrowserAnimationsModule,
        FontAwesomeModule,
        LayoutModule,
        SharedModule,
      ],
      providers: [
        {
          provide: AqlCategoryService,
          useValue: mockAqlCategoryService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToastService,
        },
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlCategoriesManagementComponent)
    component = fixture.componentInstance
    userProfileSubject$.next(mockManagerUserProfile)
    fixture.detectChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the dialog is used to edit aql data', () => {
    const dialogConfig: DialogConfig = {
      ...EDIT_AQL_CATEGORY_DIALOG_CONFIG,
      dialogContentPayload: { aqlCategory: mockAqlCategory3 },
    }

    const update: Omit<IAqlCategoryApi, 'id'> = {
      name: {
        de: 'Neuer Name',
        en: 'New name',
      },
    }

    beforeEach(async () => {
      const mockAqlCategoryObservable = of(mockAqlCategory3)
      jest
        .spyOn(mockAqlCategoryService, 'update')
        .mockImplementation(() => mockAqlCategoryObservable)
    })

    it('should open the dialog on edit event from table', () => {
      component.handleOpenEditDialog(mockAqlCategory3)
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })

    it('should call update method of aql categories service after submit', () => {
      component.handleOpenEditDialog(mockAqlCategory1)
      afterClosedSubject$.next(update)
      expect(mockAqlCategoryService.update).toHaveBeenCalledWith(update, mockAqlCategory1.id)
    })

    it('should show a success message toast to the user after update succeeded', async () => {
      await component.update(update, mockAqlCategory1.id)
      expect(mockToastService.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Success,
        message: 'QUERY_CATEGORIES.UPDATE_SUCCESS_MESSAGE',
      })
    })

    it('should do nothing if user cancels dialog', () => {
      component.handleOpenEditDialog(mockAqlCategory2)
      afterClosedSubject$.next()
      expect(mockAqlCategoryService.update).not.toHaveBeenCalled()
      expect(mockAqlCategoryService.save).not.toHaveBeenCalled()
    })
  })

  describe('When update of AQL category failed', () => {
    beforeEach(() => {
      jest.spyOn(mockAqlCategoryService, 'update').mockImplementation(() => throwError({}))
    })

    it('should show the error to the user', async () => {
      await component.update(mockAqlCategory1, 1)
      expect(mockToastService.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Error,
        message: 'QUERY_CATEGORIES.UPDATE_ERROR_MESSAGE',
      })
    })
  })

  describe('When the dialog is used to add a new category', () => {
    const dialogConfig = {
      ...EDIT_AQL_CATEGORY_DIALOG_CONFIG,
      dialogContentPayload: { aqlCategory: {} },
    }

    const newCategoryData: Omit<IAqlCategoryApi, 'id'> = {
      name: { de: 'Neue Kategorie', en: 'New Category' },
    }

    beforeEach(() => {
      const mockAqlCategoryObservable = of({
        ...newCategoryData,
        id: 4,
      })
      jest.spyOn(mockAqlCategoryService, 'save').mockImplementation(() => mockAqlCategoryObservable)
    })

    it('should open the dialog on button click from user', () => {
      component.handleOpenEditDialog()
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })

    it('should call save method of aql category service on submit', () => {
      component.handleOpenEditDialog()
      afterClosedSubject$.next(newCategoryData)
      expect(mockAqlCategoryService.save).toHaveBeenCalledWith(newCategoryData)
    })

    it('should show a success toas message after save succeeded', async () => {
      await component.create(newCategoryData)
      expect(mockToastService.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Success,
        message: 'QUERY_CATEGORIES.CREATE_SUCCESS_MESSAGE',
      })
    })

    it('should not to anything if the user cancels the dialog', () => {
      component.handleOpenEditDialog()
      afterClosedSubject$.next()
      expect(mockAqlCategoryService.save).not.toHaveBeenCalled()
      expect(mockAqlCategoryService.update).not.toHaveBeenCalled()
    })
  })

  describe('When an error occurs on creating a new category', () => {
    beforeEach(() => {
      jest.spyOn(mockAqlCategoryService, 'save').mockImplementation(() => throwError({}))
    })

    it('should show an error toast to the user', async () => {
      await component.create({ name: { de: 'Test Kategorie', en: 'Test category' } })
      expect(mockToastService.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Error,
        message: 'QUERY_CATEGORIES.CREATE_ERROR_MESSAGE',
      })
    })
  })
})
