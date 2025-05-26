import { Component } from '@angular/core'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { UserHasRoleDirective } from '../../../../shared/directives/user-has-role.directive'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { RouterLink } from '@angular/router'
import { ProjectsTableComponent } from '../projects-table/projects-table.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [
    UserHasRoleDirective,
    ButtonComponent,
    RouterLink,
    ProjectsTableComponent,
    TranslatePipe,
  ],
})
export class ProjectsComponent {
  availableRoles = AvailableRoles
  constructor() {}
}
