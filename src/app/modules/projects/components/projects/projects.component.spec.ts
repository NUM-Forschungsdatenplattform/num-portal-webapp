import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { ProjectsComponent } from './projects.component'

describe('ProjectsComponent', () => {
  let component: ProjectsComponent
  let fixture: ComponentFixture<ProjectsComponent>

  @Component({ selector: 'num-projects-table', template: '' })
  class ProjectsTableStubComponent {}

  const projectService = ({
    getAll: () => of(),
  } as unknown) as ProjectService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent, ProjectsTableStubComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: ProjectService,
          useValue: projectService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
