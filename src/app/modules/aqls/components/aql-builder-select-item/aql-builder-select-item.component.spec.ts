import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ArchetypePipe } from 'src/app/shared/pipes/archetype.pipe'
import { AqbSelectItemUiModel } from '../../models/aqb/aqb-select-item-ui.model'
import { IContainmentTreeNode } from '../../models/containment-tree-node.interface'

import { AqlBuilderSelectItemComponent } from './aql-builder-select-item.component'

describe('AqlBuilderSelectItemComponent', () => {
  let component: AqlBuilderSelectItemComponent
  let fixture: ComponentFixture<AqlBuilderSelectItemComponent>

  const compositionId = 'openEHR-EHR-COMPOSITION.report.v1'
  const compositionReferenceId = 1
  const archetypeId = 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0'
  const archetypeReferenceId = 2

  const containmentTreeNode: IContainmentTreeNode = {
    archetypeId,
    parentArchetypeId: compositionId,
    displayName: 'Test',
  }

  const item = new AqbSelectItemUiModel(
    containmentTreeNode,
    compositionReferenceId,
    archetypeReferenceId
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderSelectItemComponent, ArchetypePipe],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderSelectItemComponent)
    component = fixture.componentInstance
    component.item = item
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
