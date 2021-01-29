import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { AqbWhereItemUiModel } from '../../models/aqb/aqb-where-item-ui.model'
import { IContainmentTreeNode } from '../../models/containment-tree-node.interface'

import { AqlBuilderWhereItemComponent } from './aql-builder-where-item.component'

describe('AqlBuilderWhereItemComponent', () => {
  let component: AqlBuilderWhereItemComponent
  let fixture: ComponentFixture<AqlBuilderWhereItemComponent>

  @Component({ selector: 'num-time-input', template: '' })
  class TimeInputStubComponent {
    @Input() date: any
  }

  const compositionId = 'openEHR-EHR-COMPOSITION.report.v1'
  const compositionReferenceId = 1
  const archetypeId = 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0'
  const archetypeReferenceId = 2

  const containmentTreeNode: IContainmentTreeNode = {
    archetypeId,
    parentArchetypeId: compositionId,
    displayName: 'Test',
    rmType: ReferenceModelType.String,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderWhereItemComponent, TimeInputStubComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        ReactiveFormsModule,
        PipesModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderWhereItemComponent)
    component = fixture.componentInstance
    component.item = new AqbWhereItemUiModel(
      containmentTreeNode,
      compositionReferenceId,
      archetypeReferenceId
    )
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
