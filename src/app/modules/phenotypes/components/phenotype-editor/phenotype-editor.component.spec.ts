import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { mockPhenotype1 } from 'src/mocks/data-mocks/phenotypes.mock'
import { IPhenotypeResolved } from '../../models/phenotype-resolved.interface'

import { PhenotypeEditorComponent } from './phenotype-editor.component'

describe('PhenotypeEditorComponent', () => {
  let component: PhenotypeEditorComponent
  let fixture: ComponentFixture<PhenotypeEditorComponent>
  const resolvedData: IPhenotypeResolved = { phenotype: new PhenotypeUiModel(), error: null }
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

  const phenotypeService = ({
    create: () => of(),
  } as unknown) as PhenotypeService

  @Component({ selector: 'num-phenotype-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
  }

  @Component({ selector: 'num-phenotype-editor-connector', template: '' })
  class StubEditorConnectorComponent {
    @Input() phenotypeQuery: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PhenotypeEditorComponent,
        StubGeneralInfoComponent,
        StubEditorConnectorComponent,
        ButtonComponent,
      ],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: PhenotypeService,
          useValue: phenotypeService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On the attempt to save the phenotype', () => {
    it('should call the phenotype serivceses create method', async () => {
      const mockObservable = of(mockPhenotype1)
      jest.spyOn(phenotypeService, 'create').mockReturnValue(mockObservable)
      component.resolvedData = {
        error: null,
        phenotype: new PhenotypeUiModel(mockPhenotype1),
      }
      mockObservable.subscribe((result) => {
        expect(result).toEqual(mockPhenotype1)
      })
      fixture.detectChanges()
      component.saveForm()
    })
  })
})
