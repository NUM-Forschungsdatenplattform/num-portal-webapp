import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { AddUserOrganizationComponent } from './add-user-organization.component'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { mockOrganization1 } from 'src/mocks/data-mocks/organizations.mock'
import { OrganizationService } from 'src/app/core/services/organization.service'
import { Subject } from 'rxjs'

describe('AddUserOrganizationComponent', () => {
  let component: AddUserOrganizationComponent
  let fixture: ComponentFixture<AddUserOrganizationComponent>

  const filteredOrganizationsSubject$ = new Subject<IOrganization[]>()
  const organizationService = {
    filteredOrganizationsObservable$: filteredOrganizationsSubject$.asObservable(),
  } as OrganizationService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserOrganizationComponent],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When new filtered organizations are received', () => {
    it('should set them as data in the dataSource', () => {
      filteredOrganizationsSubject$.next([mockOrganization1])
      expect(component.dataSource.data).toEqual([mockOrganization1])
    })
  })

  describe('When the icon in the row is clicked to select a organization', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedOrganizationChange, 'emit')
      component.selectedOrganization = {
        id: '',
      }
      component.handleSelectClick(mockOrganization1)
    })

    it('should set the selectedOrganization', () => {
      expect(component.selectedOrganization).toEqual(mockOrganization1)
    })

    it('should emit the selectedOrganization', () => {
      expect(component.selectedOrganizationChange.emit).toHaveBeenCalledWith(mockOrganization1)
    })
  })

  describe('When the icon in the row is clicked to deselect a organization', () => {
    beforeEach(() => {
      jest.spyOn(component.selectedOrganizationChange, 'emit')
      component.selectedOrganization = mockOrganization1
      component.handleDeselectClick()
    })

    it('should set the selectedOrganization', () => {
      expect(component.selectedOrganization).toEqual({
        id: '',
      })
    })

    it('should emit the selectedOrganization', () => {
      expect(component.selectedOrganizationChange.emit).toHaveBeenCalledWith({
        id: '',
      })
    })
  })
})
