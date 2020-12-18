import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlBuilderTemplatesComponent } from './aql-builder-templates.component'

describe('AqlBuilderTemplatesComponent', () => {
  let component: AqlBuilderTemplatesComponent
  let fixture: ComponentFixture<AqlBuilderTemplatesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderTemplatesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderTemplatesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
