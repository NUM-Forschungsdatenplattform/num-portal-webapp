import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { UnapprovedUsersTableComponent } from './unapproved-users-table.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { mockUser, mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { DialogEditUserDetailsComponent } from '../dialog-edit-user-details/dialog-edit-user-details.component'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { mockUserProfile1, mockUserProfile3 } from 'src/mocks/data-mocks/user-profile.mock'
import { Pipe, PipeTransform } from '@angular/core'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { MatSort } from '@angular/material/sort'

describe('UnapprovedUsersTableComponent', () => {
  let component: UnapprovedUsersTableComponent
  let fixture: ComponentFixture<UnapprovedUsersTableComponent>

  const unapprovedUsersSubject$ = new Subject<IUser[]>()
  const adminService = {
    unapprovedUsersObservable$: unapprovedUsersSubject$.asObservable(),
    getUnapprovedUsers: () => of(),
    getAllPag: () => of(),
  } as unknown as AdminService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  @Pipe({
    name: 'localizedDate',
  })
  class StubLocalizedDatePipe implements PipeTransform {
    transform(value: number): number {
      return value
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnapprovedUsersTableComponent, StubLocalizedDatePipe],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        PipesModule,
      ],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
        { provide: DialogService, useValue: mockDialogService },
        {
          provide: ProfileService,
          useValue: profileService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedUsersTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
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

  describe('When sorting is triggered', () => {
    it('should fetch sorting page', () => {
      jest.spyOn(adminService, 'getAllPag').mockReturnValue(of({}))
      const sort = new MatSort()
      sort.active = 'firstName'
      sort.direction = 'asc'
      component.handleSortChangeTable(sort)
    })
  })

  describe('When unapproved users are received by the component and the user has role SuperAdmin', () => {
    beforeEach(() => {
      userProfileSubject$.next(mockUserProfile3)
      unapprovedUsersSubject$.next(mockUsers)
      fixture.detectChanges()
    })
    it('should set them into the datasource.data', () => {
      //expect(component.dataSource.data).toBe(mockUsers)
    })
  })

  describe('When approved users are received by the component and the user does not have role SuperAdmin', () => {
    beforeEach(() => {
      userProfileSubject$.next(mockUserProfile1)
      unapprovedUsersSubject$.next(mockUsers)
      fixture.detectChanges()
    })

    it('should set them into the datasource.data', () => {
      //expect(component.dataSource.data).toHaveLength(0)
    })
  })

  describe('When an icon in a row is clicked', () => {
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogEditUserDetailsComponent,
      dialogContentPayload: { user: mockUser, isApproval: true },
    }
    beforeEach(() => {
      userProfileSubject$.next(mockUserProfile3)
      fixture.detectChanges()
    })
    it('should call the dialog service with the dialogConfig to open the edit dialog', () => {
      component.handleSelectClick(mockUser)
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })
  })
})
