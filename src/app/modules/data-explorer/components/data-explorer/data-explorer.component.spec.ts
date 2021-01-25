import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataExplorerComponent } from './data-explorer.component'

describe('DataExplorerComponent', () => {
  let component: DataExplorerComponent
  let fixture: ComponentFixture<DataExplorerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExplorerComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExplorerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
