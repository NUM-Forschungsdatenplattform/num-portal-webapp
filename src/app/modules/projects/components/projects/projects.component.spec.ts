import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { SharedModule } from 'src/app/shared/shared.module'

import { ProjectsComponent } from './projects.component'

describe('ProjectsComponent', () => {
  let component: ProjectsComponent
  let fixture: ComponentFixture<ProjectsComponent>

  @Component({ selector: 'num-projects-table', template: '' })
  class ProjectsTableStubComponent {}

  const projectService = {
    getAll: () => of(),
  } as unknown as ProjectService

  const userInfoSubject$ = new Subject<IAuthUserInfo>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as unknown as AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent, ProjectsTableStubComponent],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ProjectService,
          useValue: projectService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent)
    component = fixture.componentInstance
    userInfoSubject$.next({ sub: '', groups: [AvailableRoles.StudyCoordinator] })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
