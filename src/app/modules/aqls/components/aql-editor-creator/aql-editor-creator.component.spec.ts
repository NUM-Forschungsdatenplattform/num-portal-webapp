import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlEditorCeatorComponent as AqlEditorCreatorComponent } from './aql-editor-creator.component'

describe('AqlEditorCeatorComponent', () => {
  let component: AqlEditorCreatorComponent
  let fixture: ComponentFixture<AqlEditorCreatorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlEditorCreatorComponent],
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
})
