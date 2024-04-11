import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'nestedAccess',
})
export class NestedAccessPipe implements PipeTransform {
  transform(element: any, path: (string | number)[]): string | number {
    let result = element
    for (const hierarchy of path) {
      result = result === null ? null : result[hierarchy]
    }
    return result || ''
  }
}
