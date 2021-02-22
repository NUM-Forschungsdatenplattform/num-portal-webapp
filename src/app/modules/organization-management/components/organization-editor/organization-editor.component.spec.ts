import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IOrganizationResolved } from '../../models/organization-resolved.interface'

import { OrganizationEditorComponent } from './organization-editor.component'

describe('OrganizationEditorComponent', () => {
  let component: OrganizationEditorComponent
  let fixture: ComponentFixture<OrganizationEditorComponent>

  const resolvedData: IOrganizationResolved = {
    organization: { id: '12345a', name: 'Organization A' },
    error: null,
  }
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationEditorComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
