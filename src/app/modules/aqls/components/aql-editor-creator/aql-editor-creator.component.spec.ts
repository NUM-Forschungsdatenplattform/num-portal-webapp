import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlEditorCeatorComponent as AqlEditorCreatorComponent } from './aql-editor-creator.component'

describe('AqlEditorCeatorComponent', () => {
  let component: AqlEditorCreatorComponent
  let fixture: ComponentFixture<AqlEditorCreatorComponent>

  const editorInitEmitter = new EventEmitter<any>()
  @Component({ selector: 'num-code-editor', template: '' })
  class CodeEditorStubComponent {
    @Input() value: string
    @Output() editorInit = editorInitEmitter
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlEditorCreatorComponent, CodeEditorStubComponent],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlEditorCreatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the code-editor emits the init event', () => {
    beforeEach(() => {
      editorInitEmitter.emit('test')
    })
    it('should assign the reference to the editor in this componenent', () => {
      expect(component.editor).toEqual('test')
    })
  })
})
