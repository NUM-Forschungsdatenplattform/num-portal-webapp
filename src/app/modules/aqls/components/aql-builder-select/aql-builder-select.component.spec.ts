import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlBuilderSelectComponent } from './aql-builder-select.component'

describe('AqlBuilderSelectComponent', () => {
  let component: AqlBuilderSelectComponent
  let fixture: ComponentFixture<AqlBuilderSelectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderSelectComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderSelectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
