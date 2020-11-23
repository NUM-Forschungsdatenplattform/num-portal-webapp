import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { mockPhenotype1 } from 'src/mocks/data-mocks/phenotypes.mock'
import { StudyEditorConnectorPhenotypeComponent } from './study-editor-connector-phenotype.component'

describe('StudyEditorConnectorPhenotypeComponent', () => {
  let component: StudyEditorConnectorPhenotypeComponent
  let fixture: ComponentFixture<StudyEditorConnectorPhenotypeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorConnectorPhenotypeComponent],
      imports: [FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorConnectorPhenotypeComponent)
    component = fixture.componentInstance
    component.phenotype = new PhenotypeUiModel(mockPhenotype1)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the configure phenotype event when click handler is triggered', () => {
    jest.spyOn(component.configurePhenotype, 'emit')
    component.handleClick()
    expect(component.configurePhenotype.emit).toHaveBeenCalledTimes(1)
  })
})
