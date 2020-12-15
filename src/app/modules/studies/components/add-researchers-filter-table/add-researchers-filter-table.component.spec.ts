import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddResearchersFilterTableComponent } from './add-researchers-filter-table.component'

describe('AddResearchersFilterTableComponent', () => {
  let component: AddResearchersFilterTableComponent
  let fixture: ComponentFixture<AddResearchersFilterTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddResearchersFilterTableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResearchersFilterTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
