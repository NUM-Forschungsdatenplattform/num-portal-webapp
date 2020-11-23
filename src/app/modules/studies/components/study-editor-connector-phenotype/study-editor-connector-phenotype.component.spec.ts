import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StudyEditorConnectorPhenotypeComponent } from './study-editor-connector-phenotype.component'

describe('StudyEditorConnectorPhenotypeComponent', () => {
  let component: StudyEditorConnectorPhenotypeComponent
  let fixture: ComponentFixture<StudyEditorConnectorPhenotypeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorConnectorPhenotypeComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorConnectorPhenotypeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
