import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { AqlService } from 'src/app/core/services/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { AqlEditorUiModel } from 'src/app/shared/models/aql/aql-editor-ui.model'
import { IAqlResolved } from '../../models/aql-resolved.interface'

import { AqlEditorComponent } from './aql-editor.component'
import { of } from 'rxjs'
import { mockStudy1 } from '../../../../../mocks/data-mocks/studies.mock'
import { mockCohort1 } from '../../../../../mocks/data-mocks/cohorts.mock'
import { StudyUiModel } from '../../../../shared/models/study/study-ui.model'
import { CohortGroupUiModel } from '../../../../shared/models/study/cohort-group-ui.model'
import { LogicalOperator } from '../../../../shared/models/logical-operator.enum'
import { ConnectorNodeType } from '../../../../shared/models/connector-node-type.enum'
import { PhenotypeUiModel } from '../../../../shared/models/phenotype/phenotype-ui.model'
import { mockAql1 } from '../../../../../mocks/data-mocks/aqls.mock'

describe('AqlEditorComponent', () => {
  let component: AqlEditorComponent
  let fixture: ComponentFixture<AqlEditorComponent>

  const resolvedData: IAqlResolved = { aql: new AqlEditorUiModel(), error: null }
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

  const aqlService = ({
    save: jest.fn(),
  } as unknown) as AqlService

  @Component({ selector: 'num-aql-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
  }

  @Component({ selector: 'num-aql-editor-creator', template: '' })
  class StubEditorCreatorComponent {
    @Input() aqlQuery: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AqlEditorComponent,
        StubGeneralInfoComponent,
        StubEditorCreatorComponent,
        ButtonComponent,
      ],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: AqlService,
          useValue: aqlService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On the attempt to save the AQL', () => {
    beforeEach(() => {
      const mockAqlObservable = of(mockAql1)
      jest.spyOn(aqlService, 'save').mockImplementation(() => mockAqlObservable)
      component.resolvedData = {
        error: null,
        aql: new AqlEditorUiModel(mockAql1),
      }
    })

    it('should call the AQL save method', async (done) => {
      component.save().then(() => {
        expect(aqlService.save).toHaveBeenCalledTimes(1)
        done()
      })
    })
  })
})
