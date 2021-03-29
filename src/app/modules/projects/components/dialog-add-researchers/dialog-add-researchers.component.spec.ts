import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { DialogAddResearchersComponent } from './dialog-add-researchers.component'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { mockUserResearcher, mockUsers2 } from 'src/mocks/data-mocks/admin.mock'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'

describe('DialogAddResearchersComponent', () => {
  let component: DialogAddResearchersComponent
  let fixture: ComponentFixture<DialogAddResearchersComponent>

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

  const filteredApprovedUsersSubject$ = new Subject<IUser[]>()
  const filterConfigSubject$ = new BehaviorSubject<IUserFilter>({ searchText: '' })

  const adminService = {
    filteredApprovedUsersObservable$: filteredApprovedUsersSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),

    getApprovedUsers: () => of(),
  } as AdminService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddResearchersComponent, SearchComponent, FilterTableStubComponent],
      imports: [
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PipesModule,
      ],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddResearchersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When approved users are received by the component', () => {
    it('should set the researchers into the datasource.data', () => {
      filteredApprovedUsersSubject$.next(mockUsers2)
      fixture.detectChanges()
      expect(component.dataSource.data).toStrictEqual([mockUserResearcher])
    })
  })
})
