import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutModule } from 'src/app/layout/layout.module'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { CohortBuilderComponent } from './cohort-builder.component'

describe('CohortBuilderComponent', () => {
  let component: CohortBuilderComponent
  let fixture: ComponentFixture<CohortBuilderComponent>

  @Component({ selector: 'num-aql-selection', template: '' })
  class StubAqlSelectionComponent {}

  @Component({ selector: 'num-aql-connector-group', template: '' })
  class StubAqlConnectorGroupComponent {
    @Input() cohortGroup: CohortGroupUiModel
    @Input() parentGroupIndex: number[] | null
    @Input() index: number
    @Input() isDisabled: boolean
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CohortBuilderComponent,
        StubAqlSelectionComponent,
        StubAqlConnectorGroupComponent,
      ],
      imports: [LayoutModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortBuilderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
