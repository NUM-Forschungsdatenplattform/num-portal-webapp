import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { mockPhenotype1 } from 'src/mocks/data-mocks/phenotypes.mock'
import { AddPhenotypesFilterTableComponent } from '../add-phenotypes-filter-table/add-phenotypes-filter-table.component'
import { AddPhenotypesPreviewComponent } from '../add-phenotypes-preview/add-phenotypes-preview.component'
import { DialogAddPhenotypesComponent } from './dialog-add-phenotypes.component'

describe('DialogAddPhenotypesComponent', () => {
  let component: DialogAddPhenotypesComponent
  let fixture: ComponentFixture<DialogAddPhenotypesComponent>

  const filteredPhenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IPhenotypeFilter>({ searchText: '' })
  const phenotypeService = {
    filteredPhenotypesObservable$: filteredPhenotypesSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
  } as PhenotypeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogAddPhenotypesComponent,
        SearchComponent,
        AddPhenotypesFilterTableComponent,
        AddPhenotypesPreviewComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: PhenotypeService,
          useValue: phenotypeService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPhenotypesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(phenotypeService, 'setFilter')
    jest.spyOn(component.closeDialog, 'emit')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the filter in the phenotypeService on searchChange', () => {
    component.handleSearchChange()
    expect(phenotypeService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should set the phenotypePreview on preview click', () => {
    const phenotypeUi = new PhenotypeUiModel(mockPhenotype1)
    component.handlePreviewClick(phenotypeUi)
    expect(component.phenotypePreview).toEqual(phenotypeUi)
  })

  it('should emit the close event with current phenotypes on confirmation', () => {
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })
})
