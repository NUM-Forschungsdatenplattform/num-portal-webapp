import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { OrganizationManagementComponent } from './organization-management.component'

describe('OrganizationManagementComponent', () => {
  let component: OrganizationManagementComponent
  let fixture: ComponentFixture<OrganizationManagementComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationManagementComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationManagementComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
