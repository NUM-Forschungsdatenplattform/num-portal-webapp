import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determineHits.interface'
import { PhenotypeGroupUiModel } from 'src/app/shared/models/phenotype/phenotype-group-ui.model'
import { PhenotypeEditorConnectorComponent } from './phenotype-editor-connector.component'

describe('PhenotypeAqlConnectorComponent', () => {
  let component: PhenotypeEditorConnectorComponent
  let fixture: ComponentFixture<PhenotypeEditorConnectorComponent>

  @Component({ selector: 'num-phenotype-editor-connector-group', template: '' })
  class GroupStubComponent {
    @Input() phenotypeGroup: any
    @Input() parentGroupIndex: any
  }

  @Component({ selector: 'num-editor-determine-hits', template: '' })
  class EditorDetermineHitsComponent {
    @Input() determineHitsContent: IDetermineHits
    @Output() determineHitsClicked = new EventEmitter()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PhenotypeEditorConnectorComponent,
        GroupStubComponent,
        EditorDetermineHitsComponent,
      ],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorConnectorComponent)
    component = fixture.componentInstance
    component.phenotypeQuery = new PhenotypeGroupUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
