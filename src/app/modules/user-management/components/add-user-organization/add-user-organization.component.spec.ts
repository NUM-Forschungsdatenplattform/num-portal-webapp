import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { AddUserOrganizationComponent } from './add-user-organization.component'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { mockOrganization1, mockOrganization2 } from 'src/mocks/data-mocks/organizations.mock'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { Subject } from 'rxjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('AddUserOrganizationComponent', () => {
  let component: AddUserOrganizationComponent
  let fixture: ComponentFixture<AddUserOrganizationComponent>

  const organizationsSubject$ = new Subject<IOrganization[]>()
  const organizationService = {
    organizationsObservable$: organizationsSubject$.asObservable(),
  } as OrganizationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserOrganizationComponent],
      imports: [
        MaterialModule,
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
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
    fixture = TestBed.createComponent(AddUserOrganizationComponent)
    component = fixture.componentInstance
    component.selectedOrganization = mockOrganization1
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When organizations are received', () => {
    it('should set them as organizations', () => {
      organizationsSubject$.next([mockOrganization2])
      expect(component.organizations).toEqual([mockOrganization2])
    })
  })

  describe('When an organization is selected', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedOrganizationChange, 'emit')
      component.selectedOrganization = mockOrganization2
      component.handleSelectClick()
    })

    it('should emit the selectedOrganization', () => {
      expect(component.selectedOrganizationChange.emit).toHaveBeenCalledWith(mockOrganization2)
    })
  })
})
