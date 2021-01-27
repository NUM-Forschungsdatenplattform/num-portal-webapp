import { Component, OnInit } from '@angular/core'
import { StudyService } from 'src/app/core/services/study/study.service'

@Component({
  selector: 'num-data-explorer-studies',
  templateUrl: './data-explorer-studies.component.html',
  styleUrls: ['./data-explorer-studies.component.scss'],
})
export class DataExplorerStudiesComponent implements OnInit {
  constructor(private studyService: StudyService) {}

  ngOnInit(): void {
    this.studyService.getMyPublishedStudies().subscribe()
  }
}
