import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'

import { OrganizationsTableComponent } from './organizations-table.component'

describe('OrganizationsTableComponent', () => {
  let component: OrganizationsTableComponent
  let fixture: ComponentFixture<OrganizationsTableComponent>
  let router: Router

  const organizationsSubject$ = new Subject<IOrganization[]>()
  const organizationService = ({
    organizationsObservable$: organizationsSubject$.asObservable(),
  } as unknown) as OrganizationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationsTableComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        PipesModule,
        FontAwesomeTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: OrganizationService,
          useValue: organizationService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(OrganizationsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the organizations get updated', () => {
    it('should set the organizations as table data source', () => {
      organizationsSubject$.next(mockOrganizations)
      expect(component.dataSource.data).toEqual(mockOrganizations)
    })
  })

  describe('When an organization is selected', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
    })
    it('should navigate to the organization-editor', () => {
      component.handleSelectClick(mockOrganization1)
      expect(router.navigate).toHaveBeenCalledWith(['organizations', 1, 'editor'])
    })
  })
})
