import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FilterSelectComponent } from './filter-select.component'

describe('FilterSelectComponent', () => {
  let component: FilterSelectComponent
  let fixture: ComponentFixture<FilterSelectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterSelectComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
