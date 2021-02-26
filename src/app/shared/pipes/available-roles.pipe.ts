import { Pipe, PipeTransform } from '@angular/core'
import { AvailableRoles } from '../models/available-roles.enum'
@Pipe({
  name: 'availableRoles',
})
export class AvailableRolesPipe implements PipeTransform {
  availableRoles = Object.values(AvailableRoles) as string[]
  transform(userRoles: string[]): string[] {
    return userRoles?.filter((role) => this.availableRoles.includes(role))
  }
}
