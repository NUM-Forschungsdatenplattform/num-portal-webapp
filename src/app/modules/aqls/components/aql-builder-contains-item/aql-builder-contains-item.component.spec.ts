import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ArchetypePipe } from 'src/app/shared/pipes/archetype.pipe'
import { AqbContainsItemUiModel } from '../../../../shared/models/aqb/aqb-contains-item-ui.model'

import { AqlBuilderContainsItemComponent } from './aql-builder-contains-item.component'

describe('AqlBuilderContainsItemComponent', () => {
  let component: AqlBuilderContainsItemComponent
  let fixture: ComponentFixture<AqlBuilderContainsItemComponent>

  const compositionId = 'openEHR-EHR-COMPOSITION.report.v1'
  const compositionReferenceId = 1
  const archetypeId = 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0'
  const archetypeReferenceId = 2
  const item = new AqbContainsItemUiModel(
    compositionId,
    compositionReferenceId,
    archetypeId,
    archetypeReferenceId
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderContainsItemComponent, ArchetypePipe],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderContainsItemComponent)
    component = fixture.componentInstance
    component.item = item
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the item is supposed to be deleted', () => {
    it('should emit its archetypeReferenceId to its parent', () => {
      jest.spyOn(component.deleteItemByArchetypeReferenceId, 'emit')
      component.deleteSelf()
      expect(component.deleteItemByArchetypeReferenceId.emit).toHaveBeenCalledWith(
        archetypeReferenceId
      )
    })
  })
})
