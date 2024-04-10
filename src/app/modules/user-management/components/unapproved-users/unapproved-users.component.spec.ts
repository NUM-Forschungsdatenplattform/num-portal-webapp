import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { Component } from '@angular/core'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { UnapprovedUsersComponent } from './unapproved-users.component'

describe('UnapprovedUsersComponent', () => {
  let component: UnapprovedUsersComponent
  let fixture: ComponentFixture<UnapprovedUsersComponent>

  const approvedUsersSubject$ = new Subject<IUser[]>()
  const unapprovedUsersSubject$ = new Subject<IUser[]>()
  const adminService = {
    approvedUsersObservable$: approvedUsersSubject$.asObservable(),
    unapprovedUsersObservable$: unapprovedUsersSubject$.asObservable(),
  } as AdminService

  @Component({ selector: 'num-unapproved-users-table', template: '' })
  class UserTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnapprovedUsersComponent, UserTableStubComponent],
      imports: [MaterialModule, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedUsersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
