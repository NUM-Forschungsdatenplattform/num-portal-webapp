import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddAqlsSelectedTableComponent } from './add-aqls-selected-table.component'

describe('AddAqlsSelectionTableComponent', () => {
  let component: AddAqlsSelectedTableComponent
  let fixture: ComponentFixture<AddAqlsSelectedTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAqlsSelectedTableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAqlsSelectedTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
