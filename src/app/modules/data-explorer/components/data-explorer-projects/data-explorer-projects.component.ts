import { Component, OnInit } from '@angular/core'
import { ProjectService } from 'src/app/core/services/project/project.service'

@Component({
  selector: 'num-data-explorer-projects',
  templateUrl: './data-explorer-projects.component.html',
  styleUrls: ['./data-explorer-projects.component.scss'],
})
export class DataExplorerProjectsComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getMyPublishedProjects().subscribe()
  }
}
