import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, throwError } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { mockPhenotype1 } from 'src/mocks/data-mocks/phenotypes.mock'
import { IPhenotypeResolved } from '../../models/phenotype-resolved.interface'

import { PhenotypeEditorComponent } from './phenotype-editor.component'
import { RouterTestingModule } from '@angular/router/testing'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'

describe('PhenotypeEditorComponent', () => {
  let component: PhenotypeEditorComponent
  let fixture: ComponentFixture<PhenotypeEditorComponent>
  let router: Router

  const resolvedData: IPhenotypeResolved = { phenotype: new PhenotypeUiModel(), error: null }
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

  const phenotypeService = ({
    create: jest.fn(),
    getSize: jest.fn(),
  } as unknown) as PhenotypeService

  const mockToast = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  @Component({ selector: 'num-phenotype-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
  }

  @Component({ selector: 'num-phenotype-editor-connector', template: '' })
  class StubEditorConnectorComponent {
    @Input() phenotypeQuery: any
    @Input() isDetermineDisabled: boolean
    @Input() determineHitsContent: IDetermineHits
    @Output() determineHitsClicked = new EventEmitter()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PhenotypeEditorComponent,
        StubGeneralInfoComponent,
        StubEditorConnectorComponent,
        ButtonComponent,
      ],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: PhenotypeService,
          useValue: phenotypeService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToast,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(PhenotypeEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(router, 'navigate').mockImplementation()
    jest.spyOn(mockToast, 'openToast').mockImplementation()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On the attempt to save the phenotype', () => {
    beforeEach(() => {
      const mockObservable = of(mockPhenotype1)
      jest.spyOn(phenotypeService, 'create').mockReturnValue(mockObservable)
      component.resolvedData = {
        error: null,
        phenotype: new PhenotypeUiModel(mockPhenotype1),
      }
    })

    it('should call the PhenotypeSerivce.create method with Toast and Navigate', async () => {
      component.resolvedData.phenotype.convertToApiInterface = jest.fn().mockImplementation(() => {
        return ({
          description: '',
          id: 1,
          name: 'test',
          query: 'hello',
        } as unknown) as IPhenotypeApi
      })

      component.saveForm().then(() => {
        expect(phenotypeService.create).toHaveBeenCalledTimes(1)
        expect(router.navigate).toHaveBeenCalledWith(['phenotypes'], {})
        expect(mockToast.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Success,
          message: 'PHENOTYPE.SAVE_SUCCESS_MESSAGE',
        })
      })
    })

    it('should fail to call the PhenotypeSerivce.create method and show error toast', async () => {
      component.resolvedData.phenotype.convertToApiInterface = jest.fn().mockImplementation(() => {
        return ({
          description: '',
          id: 1,
          name: 'test',
          query: 'hello',
        } as unknown) as IPhenotypeApi
      })

      jest.spyOn(phenotypeService, 'create').mockImplementationOnce(() => throwError('Error'))

      component.saveForm().then(() => {
        expect(mockToast.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Error,
          message: 'PHENOTYPE.SAVE_ERROR_MESSAGE',
        })
      })
    })

    it('should show error toast if no Query', async () => {
      component.resolvedData.phenotype.convertToApiInterface = jest.fn().mockImplementation(() => {
        return ({
          description: '',
          id: 1,
          name: 'test',
          query: undefined,
        } as unknown) as IPhenotypeApi
      })

      component.saveForm().then(() => {
        expect(mockToast.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Error,
          message: 'PHENOTYPE.SAVE_NO_AQL_ERROR_MESSAGE',
        })
      })
    })
  })

  describe('On getSize of the Phenotypes to determine hits', () => {
    beforeEach(() => {
      const mockObservable = of(2)
      jest.spyOn(phenotypeService, 'getSize').mockReturnValue(mockObservable)
      jest.spyOn(component, 'updateDetermineHits')

      component.determineHitsContent.defaultMessage = 'PHENOTYPE.HITS.MESSAGE_SET_ALL_PARAMETERS'
      component.resolvedData = {
        error: null,
        phenotype: new PhenotypeUiModel(mockPhenotype1),
      }
      component.resolvedData.phenotype.convertToApiInterface = jest.fn().mockImplementation(() => {
        return ({
          description: '',
          id: 1,
          name: 'test',
          query: 'hello',
        } as unknown) as IPhenotypeApi
      })

      jest.clearAllMocks()
    })

    it('should call PhenotypeSerivce.getSize, if there is a query', async () => {
      await component.determineHits().then(() => {
        expect(phenotypeService.getSize).toHaveBeenCalledTimes(1)
        // expect(component.updateDetermineHits).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual('')
        expect(component.determineHitsContent.count).toBeGreaterThan(0)
      })
    })

    it('should NOT call PhenotypeSerivce.getSize, if there is no query, and set default message', async () => {
      component.resolvedData.phenotype.convertToApiInterface = jest.fn().mockImplementation(() => {
        return ({
          description: '',
          id: 1,
          name: 'test',
          query: undefined,
        } as unknown) as IPhenotypeApi
      })

      await component.determineHits().then(() => {
        expect(phenotypeService.getSize).toHaveBeenCalledTimes(0)
        expect(component.updateDetermineHits).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual(
          'PHENOTYPE.HITS.MESSAGE_SET_ALL_PARAMETERS'
        )
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })

    it('should fail to call the PhenotypeSerivce.getSize method and show Too few hits error', async () => {
      jest.spyOn(phenotypeService, 'getSize').mockReturnValue(throwError({ status: 451 }))

      await component.determineHits().then(() => {
        expect(phenotypeService.getSize).toHaveBeenCalledTimes(1)
        // expect(component.updateDetermineHits).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual(
          'PHENOTYPE.HITS.MESSAGE_ERROR_FEW_HITS'
        )
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })

    it('should fail to call the PhenotypeSerivce.getSize method and show general error', async () => {
      jest.spyOn(phenotypeService, 'getSize').mockImplementationOnce(() => throwError('Error'))

      await component.determineHits().then(() => {
        // // expect(phenotypeService.getSize).toHaveBeenCalledTimes(1)
        // expect(component.updateDetermineHits).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual(
          'PHENOTYPE.HITS.MESSAGE_ERROR_MESSAGE'
        )
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })
  })

  describe('On the attempt to leave the editor', () => {
    it('should navigate back to the phenotypes page', () => {
      component.cancel()
      expect(router.navigate).toHaveBeenCalledWith(['phenotypes'], {})
    })
  })
})
