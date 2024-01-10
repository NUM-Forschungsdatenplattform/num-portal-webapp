/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { of, Subject } from 'rxjs'

import { ProjectsComponent } from './projects.component'
import { AuthService } from '../../../../core/auth/auth.service'
import { ProjectService } from '../../../../core/services/project/project.service'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { AvailableRoles } from '../../../../shared/models/available-roles.enum'
import { IAuthUserInfo } from '../../../../shared/models/user/auth-user-info.interface'
import { SharedModule } from '../../../../shared/shared.module'

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
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule,
        SharedModule,
        ,
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
