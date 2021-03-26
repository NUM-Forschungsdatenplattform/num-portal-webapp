import { Component, OnInit } from '@angular/core'
import { ProjectService } from 'src/app/core/services/project/project.service'

@Component({
  selector: 'num-data-explorer-studies',
  templateUrl: './data-explorer-projects.component.html',
  styleUrls: ['./data-explorer-projects.component.scss'],
})
export class DataExplorerProjectsComponent implements OnInit {
  constructor(private studyService: ProjectService) {}

  ngOnInit(): void {
    this.studyService.getMyPublishedProjects().subscribe()
  }
}
