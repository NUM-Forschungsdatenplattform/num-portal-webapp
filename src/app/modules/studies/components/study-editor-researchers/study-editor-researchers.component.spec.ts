import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'

import { StudyEditorResearchersComponent } from './study-editor-researchers.component'

describe('StudyEditorResearchersComponent', () => {
  let component: StudyEditorResearchersComponent
  let fixture: ComponentFixture<StudyEditorResearchersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorResearchersComponent],
      imports: [TranslateModule.forRoot()],
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
