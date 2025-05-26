import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { OrganizationManagementComponent } from './organization-management.component'
import { IFilterItem } from '../../../../shared/models//filter-chip.interface'
import { FilterChipsComponent } from 'src/app/shared/components/filter-chips/filter-chips.component'
import { OrganizationsTableComponent } from '../organizations-table/organizations-table.component'

describe('OrganizationManagementComponent', () => {
  let fixture: ComponentFixture<OrganizationManagementComponent>

  const organizationService = {
    getAllPag: jest.fn().mockImplementation(() => of()),
  } as unknown as OrganizationService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  @Component({ selector: 'num-organizations-table', template: '' })
  class StubOrganizationsTable {}

  @Component({
    selector: 'num-filter-chips',
    template: '',
  })
  class FilterChipsStubComponent {
    @Input() filterChips: IFilterItem<string | number>[]
    @Input() multiSelect: boolean
    @Output() selectionChange = new EventEmitter()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrganizationManagementComponent,
        ButtonComponent,
        StubOrganizationsTable,
        FilterChipsStubComponent,
        MaterialModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
      ],
      providers: [
        {
          provide: OrganizationService,
          useValue: organizationService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    })
      .overrideComponent(OrganizationManagementComponent, {
        remove: {
          imports: [FilterChipsComponent, OrganizationsTableComponent],
        },
        add: {
          imports: [StubOrganizationsTable, FilterChipsStubComponent],
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    TestBed.inject(Router)
    jest.restoreAllMocks()
    jest.clearAllMocks()
    jest.spyOn(organizationService, 'getAllPag')
  })

  describe('When the components gets initialized', () => {
    it('should call the getAllPag method', () => {
      fixture = TestBed.createComponent(OrganizationManagementComponent)

      fixture.detectChanges()
      expect(organizationService.getAllPag).toHaveBeenCalled()
    })
  })
})
