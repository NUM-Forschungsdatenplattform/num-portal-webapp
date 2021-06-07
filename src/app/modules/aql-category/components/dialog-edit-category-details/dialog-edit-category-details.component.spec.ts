import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogEditCategoryDetailsComponent } from './dialog-edit-category-details.component'

describe('DialogEditCategoryDetailsComponent', () => {
  let component: DialogEditCategoryDetailsComponent
  let fixture: ComponentFixture<DialogEditCategoryDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditCategoryDetailsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditCategoryDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
