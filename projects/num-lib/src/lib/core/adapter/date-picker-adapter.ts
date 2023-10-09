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

import { Injectable } from '@angular/core'
import { NativeDateAdapter } from '@angular/material/core'

@Injectable()
export class CustomDatePickerAdapter extends NativeDateAdapter {
  parse(value: string | number): Date | null {
    if (typeof value === 'string' && value.indexOf('.') > -1) {
      const str: string[] = value.split('.')
      if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1]) || isNaN(+str[2])) {
        return null
      }
      return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]))
    }
    const timestamp: number = typeof value === 'number' ? value : Date.parse(value)
    return isNaN(timestamp) ? null : new Date(timestamp)
  }
}
