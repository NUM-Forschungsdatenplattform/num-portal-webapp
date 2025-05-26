import { Component, OnInit } from '@angular/core'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { DataExplorerProjectsTableComponent } from '../data-explorer-projects-table/data-explorer-projects-table.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-data-explorer-projects',
  templateUrl: './data-explorer-projects.component.html',
  styleUrls: ['./data-explorer-projects.component.scss'],
  imports: [DataExplorerProjectsTableComponent, TranslatePipe],
})
export class DataExplorerProjectsComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getMyPublishedProjects().subscribe()
  }
}
