import { SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { mockPhenotype1, mockPhenotype2 } from 'src/mocks/data-mocks/phenotypes.mock'

import { AddPhenotypesFilterTableComponent } from './add-phenotypes-filter-table.component'

describe('AddPhenotypesFilterTableComponent', () => {
  let component: AddPhenotypesFilterTableComponent
  let fixture: ComponentFixture<AddPhenotypesFilterTableComponent>

  const filteredPhenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const phenotypeService = {
    filteredPhenotypesObservable$: filteredPhenotypesSubject$.asObservable(),
    getAll: () => of(),
  } as PhenotypeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPhenotypesFilterTableComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: PhenotypeService,
          useValue: phenotypeService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhenotypesFilterTableComponent)
    component = fixture.componentInstance
    component.selectedPhenotypes = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When new filtered phenotypes are received', () => {
    it('should set them as data in the dataSource', () => {
      filteredPhenotypesSubject$.next([mockPhenotype1])
      expect(component.dataSource.data).toEqual([mockPhenotype1])
    })
  })

  describe('When the icon in the row is clicked to select a phenotype', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedPhenotypesChange, 'emit')
      component.handleSelectClick(mockPhenotype1)
    })

    it('should emit the selectedPhenotypes array', () => {
      const phenotypeUi = new PhenotypeUiModel(mockPhenotype1)
      const emitter = component.selectedPhenotypesChange.emit as jest.Mock<any, any>
      const call = emitter.mock.calls[0][0] as PhenotypeUiModel[]
      expect(call).toBeTruthy()
      expect(call.length).toEqual(1)
      expect(call[0].id).toEqual(phenotypeUi.id)
    })

    it('should set the id key in the lookup to true', () => {
      expect(component.lookupSelectedPhenotypes[mockPhenotype1.id]).toEqual(true)
    })
  })

  describe('When the icon in the row is clicked to deselect a phenotype', () => {
    beforeEach(() => {
      component.selectedPhenotypes = [
        new PhenotypeUiModel(mockPhenotype1),
        new PhenotypeUiModel(mockPhenotype2),
      ]
      fixture.detectChanges()
      jest.spyOn(component.selectedPhenotypesChange, 'emit')
      component.handleDeselectClick(mockPhenotype1)
    })

    it('should emit the selectedPhenotypes array', () => {
      const phenotypeUi = new PhenotypeUiModel(mockPhenotype2)
      const emitter = component.selectedPhenotypesChange.emit as jest.Mock<any, any>
      const call = emitter.mock.calls[0][0] as PhenotypeUiModel[]
      expect(call).toBeTruthy()
      expect(call.length).toEqual(1)
      expect(call[0].id).toEqual(phenotypeUi.id)
    })

    it('should set the id key in the lookup to false', () => {
      expect(component.lookupSelectedPhenotypes[mockPhenotype1.id]).toEqual(false)
    })
  })

  describe('When the the row is clicked to preview a phenotype', () => {
    beforeEach(() => {
      jest.spyOn(component.phenotypePreview, 'emit')
      component.handleRowClick(mockPhenotype1)
    })

    it('should emit the phenotype to be previewed', () => {
      const emitter = component.phenotypePreview.emit as jest.Mock<any, any>
      const call = emitter.mock.calls[0][0] as PhenotypeUiModel
      expect(call).toBeTruthy()
      expect(call.id).toEqual(mockPhenotype1.id)
    })

    it('should set the id of the phenotype as the highlighted row', () => {
      expect(component.idOfHighlightedRow).toEqual(mockPhenotype1.id)
    })
  })

  describe('When the selectedPhenotypes passed in are changed', () => {
    it('should set up the selected phenotypes lookup', () => {
      component.selectedPhenotypes = [new PhenotypeUiModel(mockPhenotype1)]
      const change = new SimpleChange([], component.selectedPhenotypes, false)
      component.ngOnChanges({ selectedPhenotypes: change })
      fixture.detectChanges()
      expect(component.lookupSelectedPhenotypes[mockPhenotype1.id]).toEqual(true)
    })
  })
})
