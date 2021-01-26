import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlTableComponent } from './aql-table.component'
import { TranslateModule } from '@ngx-translate/core'
import { SearchComponent } from '../../../../shared/components/search/search.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { IAqlFilter } from '../../../../shared/models/aql/aql-filter.interface'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { IFilterItem } from '../../../../shared/models/filter-chip.interface'

describe('AqlTableComponent', () => {
  let component: AqlTableComponent
  let fixture: ComponentFixture<AqlTableComponent>

  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterItem: [] })
  const aqlService = {
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
  } as AqlService

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  @Component({ selector: 'num-filter-chips', template: '' })
  class StubFilterChipsComponent {
    @Input() filterChips: IFilterItem<string | number>[]
    @Input() multiSelect: boolean
    @Output() selectionChange = new EventEmitter()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AqlTableComponent,
        SearchComponent,
        DefinitionListStubComponent,
        StubFilterChipsComponent,
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(AqlTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(aqlService, 'setFilter')
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
})
