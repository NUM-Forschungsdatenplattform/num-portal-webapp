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
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { DataExplorerProjectsComponent } from './data-explorer-projects.component'

describe('DataExplorerProjectsComponent', () => {
  let component: DataExplorerProjectsComponent
  let fixture: ComponentFixture<DataExplorerProjectsComponent>

  @Component({ selector: 'num-data-explorer-projects-table', template: '' })
  class DataExplorerProjectsTableStubComponent {}

  const projectService = {
    getMyPublishedProjects: () => of(),
  } as unknown as ProjectService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExplorerProjectsComponent, DataExplorerProjectsTableStubComponent],
      imports: [MaterialModule, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: ProjectService,
          useValue: projectService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExplorerProjectsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(projectService, 'getMyPublishedProjects')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call getMyPublishedProjects method', () => {
    expect(projectService.getMyPublishedProjects).toHaveBeenCalled()
  })
})
