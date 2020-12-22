import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlBuilderContainsComponent } from './aql-builder-contains.component'

describe('AqlBuilderContainsComponent', () => {
  let component: AqlBuilderContainsComponent
  let fixture: ComponentFixture<AqlBuilderContainsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderContainsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderContainsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
