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

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { mockProject3 } from 'src/mocks/data-mocks/project.mock'

import { DataExplorerProjectsTableComponent } from './data-explorer-projects-table.component'

describe('DataExplorerProjectsTableComponent', () => {
  let component: DataExplorerProjectsTableComponent
  let fixture: ComponentFixture<DataExplorerProjectsTableComponent>
  let router: Router

  const myPublishedProjectsSubject$ = new Subject<IProjectApi[]>()
  const projectService = ({
    myPublishedProjectsObservable$: myPublishedProjectsSubject$.asObservable(),
  } as unknown) as ProjectService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExplorerProjectsTableComponent],
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
          provide: ProjectService,
          useValue: projectService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(DataExplorerProjectsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When myPublishedProjects get updated', () => {
    it('should set the projects, the user is assigned to as researcher and which are in published state, as table data source', () => {
      myPublishedProjectsSubject$.next([mockProject3])
      expect(component.dataSource.data).toEqual([mockProject3])
    })
  })

  describe('When a project is selected', () => {
    beforeEach(() => {
      jest.spyOn(router, 'navigate').mockImplementation()
    })
    it('should navigate to the data explorer project detail page', () => {
      const projectId = 1
      component.handleSelectClick(projectId)
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/projects', projectId])
    })
  })
})
