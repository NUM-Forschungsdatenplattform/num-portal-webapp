import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
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
import { Router } from '@angular/router'
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface'
import { ProfileService } from '../../../../core/services/profile/profile.service'
import { RouterTestingModule } from '@angular/router/testing'
import { PipesModule } from '../../../../shared/pipes/pipes.module'
import { AqlMenuKeys } from './menu-item'
import { mockAql1 } from '../../../../../mocks/data-mocks/aqls.mock'

describe('AqlTableComponent', () => {
  let component: AqlTableComponent
  let fixture: ComponentFixture<AqlTableComponent>
  let router: Router

  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterItem: [] })

  const aqlService = ({
    delete: jest.fn(),
    getAll: () => of(),
    setFilter: (_: any) => {},
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
  } as unknown) as AqlService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

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
        RouterTestingModule.withRoutes([]),
        PipesModule,
      ],
      providers: [
        {
          provide: AqlService,
          useValue: aqlService,
        },
        {
          provide: ProfileService,
          useValue: profileService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    router = TestBed.inject(Router)
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

  describe('When a menu Item is clicked', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
    })

    test.each([AqlMenuKeys.Edit, AqlMenuKeys.Clone])(
      'should call the AQL editor with the menu item key clicked',
      (menuKey: AqlMenuKeys) => {
        const aqlId = 1
        component.handleMenuClick(menuKey, aqlId)

        expect(router.navigate).toHaveBeenCalledWith(['aqls', aqlId, 'editor'])
      }
    )
  })

  describe('On the attempt to delete the AQL', () => {
    beforeEach(() => {
      const mockAqlObservable = of(mockAql1)
      jest.spyOn(aqlService, 'delete').mockImplementation(() => mockAqlObservable)
    })

    it('should call the AQL delete method', async (done) => {
      const aqlId = 1
      component.delete(aqlId).then(() => {
        expect(aqlService.delete).toHaveBeenCalledTimes(1)
        done()
      })
    })
  })
})
