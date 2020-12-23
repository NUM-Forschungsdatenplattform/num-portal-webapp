import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlBuilderContainsItemComponent } from './aql-builder-contains-item.component'

describe('AqlBuilderContainsItemComponent', () => {
  let component: AqlBuilderContainsItemComponent
  let fixture: ComponentFixture<AqlBuilderContainsItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderContainsItemComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderContainsItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
