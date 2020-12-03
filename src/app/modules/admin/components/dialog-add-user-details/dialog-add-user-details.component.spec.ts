import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { mockUser } from 'src/mocks/data-mocks/admin.mock'
import { AddUserRolesComponent } from '../add-user-roles/add-user-roles.component'
import { DialogAddUserDetailsComponent } from './dialog-add-user-details.component'

describe('DialogAddUserDetailsComponent', () => {
  let component: DialogAddUserDetailsComponent
  let fixture: ComponentFixture<DialogAddUserDetailsComponent>

  const adminService = {
    addUserRoles: (userId: string, role: string) => of(),
  } as AdminService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddUserDetailsComponent, AddUserRolesComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUserDetailsComponent)
    component = fixture.componentInstance
    component.dialogInput = mockUser
    fixture.detectChanges()
    jest.spyOn(adminService, 'addUserRoles')
    jest.spyOn(component.closeDialog, 'emit')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the close event on confirmation', () => {
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  describe('When roles are assigned and the dialog is confirmed', () => {
    beforeEach(() => {
      component.roles = ['some', 'assigned', 'role']
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call addUserRoles with userId for each role', () => {
      expect(adminService.addUserRoles).toHaveBeenCalledTimes(3)
    })
  })
})
