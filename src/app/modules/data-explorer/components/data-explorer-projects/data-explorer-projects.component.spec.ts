import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { DataExplorerProjectsComponent } from './data-explorer-projects.component'

describe('DataExplorerProjectsComponent', () => {
  let component: DataExplorerProjectsComponent
  let fixture: ComponentFixture<DataExplorerProjectsComponent>

  @Component({ selector: 'num-data-explorer-studies-table', template: '' })
  class DataExplorerProjectsTableStubComponent {}

  const projectService = ({
    getMyPublishedProjects: () => of(),
  } as unknown) as ProjectService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExplorerProjectsComponent, DataExplorerProjectsTableStubComponent],
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
