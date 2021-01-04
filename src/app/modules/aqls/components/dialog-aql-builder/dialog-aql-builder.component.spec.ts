import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { mockAqbTemplates } from 'src/mocks/data-mocks/aqb/aqb-templates.mock'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

import { DialogAqlBuilderComponent } from './dialog-aql-builder.component'

describe('DialogAqlBuilderComponent', () => {
  let component: DialogAqlBuilderComponent
  let fixture: ComponentFixture<DialogAqlBuilderComponent>

  @Component({ selector: 'num-aql-builder-templates', template: '' })
  class TemplatesStubComponent {
    @Input()
    templates: any

    @Input()
    selectedTemplates: any
  }
  @Component({ selector: 'num-aql-builder-select', template: '' })
  class SelectStubComponent {
    @Input()
    aqbModel: any
  }
  @Component({ selector: 'num-aql-builder-contains', template: '' })
  class ContainsStubComponent {
    @Input()
    compositions: any
  }
  @Component({ selector: 'num-aql-builder-where', template: '' })
  class WhereStubComponent {}

  const templatesSubject$ = new Subject<IEhrbaseTemplate[]>()

  const aqlEditorService = ({
    getTemplates: jest.fn(),
    templatesObservable$: templatesSubject$.asObservable(),
  } as unknown) as AqlEditorService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogAqlBuilderComponent,
        TemplatesStubComponent,
        SelectStubComponent,
        ContainsStubComponent,
        WhereStubComponent,
        ButtonComponent,
      ],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [{ provide: AqlEditorService, useValue: aqlEditorService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAqlBuilderComponent)
    component = fixture.componentInstance
    jest.spyOn(component.closeDialog, 'emit')
    jest.spyOn(aqlEditorService, 'getTemplates').mockImplementation(() => of())
    component.dialogInput = new AqbUiModel()
    fixture.detectChanges()
  })

  it('should create and fetch templates', () => {
    expect(component).toBeTruthy()
    expect(aqlEditorService.getTemplates).toHaveBeenCalled()
  })

  it('should set the templates to the component once they are received', () => {
    templatesSubject$.next(mockAqbTemplates)
    expect(component.templates).toEqual(mockAqbTemplates)
  })

  it('should emit the close event with current dialogInput on confirmation', () => {
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })
})
