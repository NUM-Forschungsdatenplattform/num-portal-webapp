import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlBuilderSelectItemComponent } from './aql-builder-select-item.component'

describe('AqlBuilderSelectItemComponent', () => {
  let component: AqlBuilderSelectItemComponent
  let fixture: ComponentFixture<AqlBuilderSelectItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderSelectItemComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderSelectItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
