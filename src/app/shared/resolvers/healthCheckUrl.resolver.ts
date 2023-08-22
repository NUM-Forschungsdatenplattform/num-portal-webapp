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
import { Resolve, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { HEALTH_CHECK_URL } from '../constants'

@Injectable({
  providedIn: 'root',
})
export class HealthCheckUrlResolver implements Resolve<void> {
  constructor(private translate: TranslateService, private router: Router) {}
  resolve(): void {
    let link: string
    if (this.translate.currentLang == 'de') {
      link = HEALTH_CHECK_URL.DE
    } else {
      link = HEALTH_CHECK_URL.EN
    }
    this.router.navigate([]).then((_) => {
      window.open(link, '_blank')
    })
  }
}
