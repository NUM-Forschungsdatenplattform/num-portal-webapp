import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { DialogService } from 'src/app/core/services/dialog.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { PhenotypeGroupUiModel } from 'src/app/shared/models/phenotype/phenotype-group-ui.model'
import { GroupIndexPipe } from 'src/app/shared/pipes/group-index.pipe'

import { PhenotypeEditorConnectorGroupComponent } from './phenotype-editor-connector-group.component'

describe('PhenotypeEditorConnectorGroupComponent', () => {
  let component: PhenotypeEditorConnectorGroupComponent
  let fixture: ComponentFixture<PhenotypeEditorConnectorGroupComponent>
  let dialogService: DialogService

  @Component({ selector: 'num-phenotype-editor-connector-aql', template: '' })
  class AqlStubComponent {
    @Input() phenotypeAql: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhenotypeEditorConnectorGroupComponent, AqlStubComponent, GroupIndexPipe],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    dialogService = TestBed.inject(DialogService)
    jest.spyOn(dialogService, 'openDialog').mockImplementation()
    fixture = TestBed.createComponent(PhenotypeEditorConnectorGroupComponent)
    component = fixture.componentInstance
    component.phenotypeGroup = new PhenotypeGroupUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
