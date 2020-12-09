import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ApprovedUsersTableComponent } from './approved-users-table.component'

describe('ApprovedUsersTableComponent', () => {
  let component: ApprovedUsersTableComponent
  let fixture: ComponentFixture<ApprovedUsersTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedUsersTableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedUsersTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
