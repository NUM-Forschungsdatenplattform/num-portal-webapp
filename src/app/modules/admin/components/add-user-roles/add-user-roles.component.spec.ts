import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { AddUserRolesComponent } from './add-user-roles.component'

describe('AddUserRolesComponent', () => {
  let component: AddUserRolesComponent
  let fixture: ComponentFixture<AddUserRolesComponent>

  const mockRole = 'TEST'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserRolesComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserRolesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the icon in the row is clicked to select a role', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedRolesChange, 'emit')
      component.selectedRoles = []
      component.handleSelectClick(mockRole)
    })

    it('should emit the selectedRoles array', () => {
      expect(component.selectedRolesChange.emit).toHaveBeenCalledWith([mockRole])
    })

    it('should set the id key in the lookup to true', () => {
      expect(component.lookupSelectedRole[mockRole]).toEqual(true)
    })
  })

  describe('When the icon in the row is clicked to deselect a role', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedRolesChange, 'emit')
      component.selectedRoles = [mockRole]
      component.handleDeselectClick(mockRole)
    })

    it('should emit the selectedRoles array', () => {
      expect(component.selectedRolesChange.emit).toHaveBeenCalledWith([])
    })

    it('should set the id key in the lookup to false', () => {
      expect(component.lookupSelectedRole[mockRole]).toEqual(false)
    })
  })
})
