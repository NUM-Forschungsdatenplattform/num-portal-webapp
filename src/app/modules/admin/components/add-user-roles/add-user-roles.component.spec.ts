import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddUserRolesComponent } from './add-user-roles.component'

describe('AddUserRolesComponent', () => {
  let component: AddUserRolesComponent
  let fixture: ComponentFixture<AddUserRolesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserRolesComponent],
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
})
