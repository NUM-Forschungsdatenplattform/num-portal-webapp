import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { of } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { mockCoronaAnamnese } from 'src/mocks/data-mocks/aqb/corona-anamnese.mock'
import { mockSimpleContainment } from 'src/mocks/data-mocks/aqb/simple-containment.mock'

import { AqlBuilderTemplateTreeComponent } from './aql-builder-template-tree.component'

describe('AqlBuilderTemplateTreeComponent', () => {
  let component: AqlBuilderTemplateTreeComponent
  let fixture: ComponentFixture<AqlBuilderTemplateTreeComponent>

  const mockInput: IEhrbaseTemplate = {
    templateId: 'testId',
    description: 'testDescription',
  }

  const aqlEditorService = ({
    getContainment: jest.fn(),
  } as unknown) as AqlEditorService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderTemplateTreeComponent],
      imports: [BrowserAnimationsModule, MaterialModule, FontAwesomeTestingModule],
      providers: [
        {
          provide: AqlEditorService,
          useValue: aqlEditorService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderTemplateTreeComponent)
    component = fixture.componentInstance
    component.template = mockInput
  })

  describe('When it gets initialized with a complex template', () => {
    beforeEach(() => {
      const mockReturn = of(mockCoronaAnamnese)
      jest.spyOn(aqlEditorService, 'getContainment').mockImplementation((_) => mockReturn)
      fixture.detectChanges()
    })
    it('should create', () => {
      expect(component).toBeTruthy()
    })
  })

  describe('When it gets initialized with a simple but specific template', () => {
    beforeEach(() => {
      const mockReturn = of(mockSimpleContainment)
      jest.spyOn(aqlEditorService, 'getContainment').mockImplementation((_) => mockReturn)
      fixture.detectChanges()
    })
    it('should create and convert as expected', async () => {
      await fixture.whenStable()

      const data = component.nestedDataSource.data

      expect(data.length).toEqual(1)
      expect(data[0].displayName).toEqual('Test')
    })
  })
})
