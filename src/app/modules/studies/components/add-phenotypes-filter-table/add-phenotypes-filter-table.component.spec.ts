import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddPhenotypesFilterTableComponent } from './add-phenotypes-filter-table.component'

describe('AddPhenotypesFilterTableComponent', () => {
  let component: AddPhenotypesFilterTableComponent
  let fixture: ComponentFixture<AddPhenotypesFilterTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPhenotypesFilterTableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhenotypesFilterTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
