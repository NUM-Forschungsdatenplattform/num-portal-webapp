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
