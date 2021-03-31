/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
