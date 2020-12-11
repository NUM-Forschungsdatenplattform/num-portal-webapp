import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin.service'
import { ApprovedUsersComponent } from './approved-users.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IUser } from 'src/app/shared/models/user/user.interface'

describe('ApprovedUsersComponent', () => {
  let component: ApprovedUsersComponent
  let fixture: ComponentFixture<ApprovedUsersComponent>

  const approvedUsersSubject$ = new Subject<IUser[]>()
  const adminService = {
    approvedUsersObservable$: approvedUsersSubject$.asObservable(),
    getApprovedUsers: () => of(),
  } as AdminService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedUsersComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedUsersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(adminService, 'getApprovedUsers')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call getApprovedUsers', () => {
    expect(adminService.getApprovedUsers).toHaveBeenCalled()
  })
})
