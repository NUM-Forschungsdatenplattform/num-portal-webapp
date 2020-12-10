import { Component, OnInit } from '@angular/core'
import { StudyService } from 'src/app/core/services/study.service'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'

@Component({
  selector: 'num-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
})
export class StudiesComponent implements OnInit {
  constructor(private studyService: StudyService) {}
  ngOnInit(): void {
    this.studyService.getAll().subscribe()
  }
}
