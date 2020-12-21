import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { FilterTableComponent } from 'src/app/shared/components/filter-table/filter-table.component'
import { DialogAddResearchersComponent } from './dialog-add-researchers.component'
import { AdminService } from 'src/app/core/services/admin.service'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { mockApprovedUsers, mockUser } from 'src/mocks/data-mocks/admin.mock'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'

describe('DialogAddResearchersComponent', () => {
  let component: DialogAddResearchersComponent
  let fixture: ComponentFixture<DialogAddResearchersComponent>

  const filteredApprovedUsersSubject$ = new Subject<IUser[]>()
  const filterConfigSubject$ = new BehaviorSubject<IUserFilter>({ searchText: '' })

  const adminService = {
    filteredApprovedUsersObservable$: filteredApprovedUsersSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),

    getApprovedUsers: () => of(),
  } as AdminService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddResearchersComponent, SearchComponent, FilterTableComponent],
      imports: [
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
    it('should set them into the datasource.data', () => {
      filteredApprovedUsersSubject$.next(mockApprovedUsers)
      fixture.detectChanges()
      expect(component.users).toBe(mockApprovedUsers)
    })
  })
})
