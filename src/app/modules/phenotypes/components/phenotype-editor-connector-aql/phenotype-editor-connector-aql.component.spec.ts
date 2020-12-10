import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'

import { PhenotypeEditorConnectorAqlComponent } from './phenotype-editor-connector-aql.component'

describe('PhenotypeEditorConnectorAqlComponent', () => {
  let component: PhenotypeEditorConnectorAqlComponent
  let fixture: ComponentFixture<PhenotypeEditorConnectorAqlComponent>
  const inputApiAql: IAqlApi = {
    id: 1,
    name: 'Test',
    query: '',
  }
  const inputAql = new AqlUiModel(inputApiAql, true)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhenotypeEditorConnectorAqlComponent],
      imports: [FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorConnectorAqlComponent)
    component = fixture.componentInstance
    component.phenotypeAql = inputAql
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the configure aql event when click handler is triggered', () => {
    jest.spyOn(component.configureAql, 'emit')
    component.handleClick()
    expect(component.configureAql.emit).toHaveBeenCalledTimes(1)
  })
})
