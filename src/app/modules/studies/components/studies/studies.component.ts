import { Component, OnInit } from '@angular/core'
import { StudyService } from 'src/app/core/services/study.service'

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
