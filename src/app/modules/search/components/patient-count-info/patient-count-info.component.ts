import { Component, Input } from '@angular/core'

@Component({
  selector: 'num-patient-count-info',
  templateUrl: './patient-count-info.component.html',
  styleUrls: ['./patient-count-info.component.scss'],
})
export class PatientCountInfoComponent {
  @Input() patientCount: number

  constructor() {}
}
