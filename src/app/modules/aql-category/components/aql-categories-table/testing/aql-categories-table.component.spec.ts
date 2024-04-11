import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlCategoriesTableComponent } from '../aql-categories-table.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  mockAqlCategories,
  mockAqlCategory1,
  mockAqlCategory2,
} from 'src/mocks/data-mocks/aql-categories.mock'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DELETE_AQL_CATEGORY_DIALOG_CONFIG } from '../constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { AqlCategoryMenuKeys } from '../menu-item'
import { MatSort } from '@angular/material/sort'

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
        NoopAnimationsModule,
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
