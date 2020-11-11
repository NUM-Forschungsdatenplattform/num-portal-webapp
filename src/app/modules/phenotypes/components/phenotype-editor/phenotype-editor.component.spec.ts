import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
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
      ],
      imports: [MaterialModule, TranslateModule.forRoot()],
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
})
