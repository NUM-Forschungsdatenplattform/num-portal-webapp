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

describe('AqlTableComponent', () => {
  let component: AqlTableComponent
  let fixture: ComponentFixture<AqlTableComponent>

  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterChips: [] })
  const aqlService = {
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getAll: () => of(),
    setFilter: (_: any) => {},
  } as AqlService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlTableComponent, SearchComponent],
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
})
