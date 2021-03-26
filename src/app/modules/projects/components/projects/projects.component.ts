import { Component, OnInit } from '@angular/core'
import { ProjectService } from 'src/app/core/services/project/project.service'

@Component({
  selector: 'num-studies',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(private studyService: ProjectService) {}
  ngOnInit(): void {
    this.studyService.getAll().subscribe()
  }
}
