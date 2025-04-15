import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'isSelected',
  standalone: false,
})
export class IsSelectedPipe implements PipeTransform {
  transform(identifier: string | number, lookUp: Map<string | number, boolean>): boolean {
    return lookUp.get(identifier) || false
  }
}
