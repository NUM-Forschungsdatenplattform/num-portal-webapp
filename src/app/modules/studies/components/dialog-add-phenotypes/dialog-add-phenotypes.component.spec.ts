import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FilterChipsComponent } from 'src/app/shared/components/filter-chips/filter-chips.component'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'

import { DialogAddPhenotypesComponent } from './dialog-add-phenotypes.component'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { IUser } from '../../../../shared/models/user/user.interface'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { IPhenotypeApi } from 'src/app/shared/models/phenotype/phenotype-api.interface'

describe('DialogAddPhenotypesComponent', () => {
  let component: DialogAddPhenotypesComponent
  let fixture: ComponentFixture<DialogAddPhenotypesComponent>
  const filteredPhenotypesSubject$ = new Subject<IPhenotypeApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IPhenotypeFilter>({
    searchText: '',
  })
  const phenotypeService = {
    filteredPhenotypesObservable$: filteredPhenotypesSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
  } as PhenotypeService

  const selectedItemsChangeEmitter = new EventEmitter<IUser[]>()

  @Component({ selector: 'num-filter-table', template: '' })
  class FilterTableStubComponent {
    @Input() dataSource: MatTableDataSource<IUser>
    @Input() identifierName: string
    @Input() columnKeys: string[]
    @Input() columnPaths: string[][]
    @Input() selectedItems: IUser[]
    @Output() selectedItemsChange = selectedItemsChangeEmitter
    @Input() idOfHighlightedRow: string | number
  }

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogAddPhenotypesComponent,
        FilterChipsComponent,
        SearchComponent,
        FilterTableStubComponent,
        DefinitionListStubComponent,
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

  it('should emit the close event with current phenotypes on confirmation', () => {
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })
})
