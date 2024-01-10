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
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { BehaviorSubject, of } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { LocalizedDatePipe } from 'src/app/shared/pipes/localized-date.pipe'
import { mockDashboardProjects } from 'src/mocks/data-mocks/dashboard-projects.mock'

import { LatestProjectsComponent } from './latest-projects.component'

describe('ProjectsComponent', () => {
  let component: LatestProjectsComponent
  let fixture: ComponentFixture<LatestProjectsComponent>

  const mockContentService = {
    getLatestProjects: jest.fn(),
    projectsObservable$: new BehaviorSubject(mockDashboardProjects),
  } as unknown as ContentService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestProjectsComponent, LocalizedDatePipe],
      imports: [
        FlexLayoutModule,
        FontAwesomeTestingModule,
        MaterialModule,
      ],
      providers: [
        {
          provide: ContentService,
          useValue: mockContentService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest
      .spyOn(mockContentService, 'getLatestProjects')
      .mockImplementation(() => of(mockDashboardProjects))
    fixture = TestBed.createComponent(LatestProjectsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch the latest projects on init', () => {
    expect(mockContentService.getLatestProjects).toHaveBeenCalled()
  })
})
