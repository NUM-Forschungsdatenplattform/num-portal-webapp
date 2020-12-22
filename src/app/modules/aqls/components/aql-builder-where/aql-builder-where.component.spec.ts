import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AqlBuilderWhereComponent } from './aql-builder-where.component'

describe('AqlBuilderWhereComponent', () => {
  let component: AqlBuilderWhereComponent
  let fixture: ComponentFixture<AqlBuilderWhereComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderWhereComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderWhereComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
