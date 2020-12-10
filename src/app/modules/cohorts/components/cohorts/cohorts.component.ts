import { Component, OnInit } from '@angular/core'
import { CohortService } from 'src/app/core/services/cohort.service'

@Component({
  selector: 'num-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.scss'],
})
export class CohortsComponent implements OnInit {
  constructor(private cohortService: CohortService) {}

  cohortSize: number
  cohortId: number
  error: boolean

  ngOnInit(): void {}

  checkCohortSize(): void {
    this.cohortSize = null
    if (!this.cohortId) {
      this.error = true
    } else {
      this.error = false
      this.cohortService.getCohortSize(this.cohortId).subscribe((size) => (this.cohortSize = size))
    }
  }
}
