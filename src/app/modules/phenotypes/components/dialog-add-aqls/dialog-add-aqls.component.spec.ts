import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FilterChipsComponent } from 'src/app/shared/components/filter-chips/filter-chips.component'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'

import { DialogAddAqlsComponent } from './dialog-add-aqls.component'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { IUser } from '../../../../shared/models/user/user.interface'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { mockAql1, mockAql3, mockAql4, mockAqls } from 'src/mocks/data-mocks/aqls.mock'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'

describe('DialogAddAqlsComponent', () => {
  let component: DialogAddAqlsComponent
  let fixture: ComponentFixture<DialogAddAqlsComponent>
  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterItem: [] })
  const aqlService = {
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
  } as AqlService

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
        DialogAddAqlsComponent,
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
          provide: AqlService,
          useValue: aqlService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAqlsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(aqlService, 'setFilter')
    jest.spyOn(component.closeDialog, 'emit')
    jest.spyOn(component, 'generatePreviewData')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the filter in the aqlService on searchChange', () => {
    component.handleSearchChange()
    expect(aqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should set the filter in the aqlService on filterChange', () => {
    component.handleFilterChange()
    expect(aqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })

  it('should emit the close event with current aqls on confirmation', () => {
    component.selectedAqls = [new AqlUiModel(mockAql3), mockAql4]
    component.handleDialogConfirm()

    expect(component.selectedAqls).toEqual([new AqlUiModel(mockAql3), new AqlUiModel(mockAql4)])
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.selectedAqls)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  it('should call generatePreviewData on Row click', () => {
    component.handlePreviewClick(mockAql1)
    expect(component.generatePreviewData).toHaveBeenCalledWith(mockAql1)
  })

  describe('set data', () => {
    it('should set data with array of AQLs', () => {
      component.handleFilteredData(mockAqls)

      expect(component.generatePreviewData).toHaveBeenCalledWith(mockAql1)
      expect(component.idOfHighlightedRow).toEqual(mockAql1.id)
      expect(component.preview).toEqual([
        {
          title: 'FORM.AUTHOR',
          description: mockAql1.owner?.lastName
            ? mockAql1.owner?.firstName + ' ' + mockAql1.owner?.lastName
            : '-',
        },
        { title: 'FORM.PURPOSE', description: mockAql1.purpose },
        { title: 'FORM.USE', description: mockAql1.use },
      ])

      expect(component.dataSource.data).toEqual(mockAqls)
    })

    it('should set data with an empty array, if no AQLs', () => {
      component.handleFilteredData([])

      expect(component.generatePreviewData).toHaveBeenCalledWith(null)
      expect(component.idOfHighlightedRow).toEqual(null)
      expect(component.preview).toEqual([])

      expect(component.dataSource.data).toEqual([])
    })
  })
})
