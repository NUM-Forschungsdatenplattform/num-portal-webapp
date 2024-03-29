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
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { IAppConfig } from './app-config.model'

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly CONFIG_URL = `assets/config/config.${environment.name}.json`

  config: IAppConfig = null

  constructor(private http: HttpClient) {}

  public loadConfig(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get<IAppConfig>(this.CONFIG_URL)
        .toPromise()
        .then((config) => {
          this.config = config
          return resolve()
        })
        .catch((error) => {
          return reject(`Could not load AppConfig': ${JSON.stringify(error)}`)
        })
    })
  }
}
