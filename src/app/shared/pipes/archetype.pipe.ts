import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'archetype',
})
export class ArchetypePipe implements PipeTransform {
  transform(value: string, isSelect?: boolean): string {
    const typeAndName = value.split('openEHR-EHR-')[1]

    if (typeAndName) {
      const type = typeAndName.split('.')[0]
      const name = typeAndName.split('.')[1]
      return isSelect ? `${type} ${name}*` : `${type} ${name}`
    }

    return value
  }
}
