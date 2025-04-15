import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'groupIndex',
  standalone: false,
})
export class GroupIndexPipe implements PipeTransform {
  transform(indexArray: number[]): string {
    return indexArray.join('.')
  }
}
