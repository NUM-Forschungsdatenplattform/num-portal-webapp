import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { StudyEditorResearchersComponent } from './study-editor-researchers.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

describe('StudyEditorResearchersComponent', () => {
  let component: StudyEditorResearchersComponent
  let fixture: ComponentFixture<StudyEditorResearchersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorResearchersComponent, ButtonComponent],
      imports: [
        TranslateModule.forRoot(),
        MaterialModule,
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorResearchersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
