import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlCategoriesManagementComponent } from './aql-categories-management.component'

describe('AqlCategoriesManagementComponent', () => {
  let component: AqlCategoriesManagementComponent
  let fixture: ComponentFixture<AqlCategoriesManagementComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlCategoriesManagementComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlCategoriesManagementComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
