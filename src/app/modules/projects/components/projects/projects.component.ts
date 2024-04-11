import { Component } from '@angular/core'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'

@Component({
  selector: 'num-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  availableRoles = AvailableRoles
  constructor() {}
}
