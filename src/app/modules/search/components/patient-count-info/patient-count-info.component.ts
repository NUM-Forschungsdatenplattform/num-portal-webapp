import { Component, Input } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-patient-count-info',
  templateUrl: './patient-count-info.component.html',
  styleUrls: ['./patient-count-info.component.scss'],
  imports: [TranslatePipe],
})
export class PatientCountInfoComponent {
  @Input() patientCount: number

  constructor() {}
}
