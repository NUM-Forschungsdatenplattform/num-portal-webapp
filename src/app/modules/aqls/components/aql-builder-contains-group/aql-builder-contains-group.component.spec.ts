import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlBuilderContainsGroupComponent } from './aql-builder-contains-group.component'

describe('AqlBuilderContainsGroupComponent', () => {
  let component: AqlBuilderContainsGroupComponent
  let fixture: ComponentFixture<AqlBuilderContainsGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderContainsGroupComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderContainsGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
