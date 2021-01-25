import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataExplorerStudiesTableComponent } from './data-explorer-studies-table.component'

describe('DataExplorerStudiesTableComponent', () => {
  let component: DataExplorerStudiesTableComponent
  let fixture: ComponentFixture<DataExplorerStudiesTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExplorerStudiesTableComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExplorerStudiesTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
