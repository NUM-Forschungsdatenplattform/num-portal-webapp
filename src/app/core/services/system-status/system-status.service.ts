import { Injectable } from '@angular/core'
import { Environment } from './envs'
import { HttpClient } from '@angular/common/http'
import { AppConfigService } from 'src/app/config/app-config.service'
import { SystemStatus } from './system-status.interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SystemStatusService {
  baseUrl: string
  constructor(
    private httpClient: HttpClient,
    public appConfig: AppConfigService,
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/admin/services-status`
  }

  private getEnv(): Environment {
    const hostedEnv = window.location.host.split('.')[0]
    let env: Environment
    if (hostedEnv.includes('dev') || hostedEnv.includes('localhost')) {
      env = Environment.DEV
    } else if (hostedEnv.includes('test')) {
      env = Environment.TEST
    } else if (hostedEnv.includes('preprod')) {
      env = Environment.PREPROD
    } else {
      env = Environment.STAGING
    }
    return env
  }
  /*  getSystemStatus(): Promise<SystemStatus> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${this.baseUrl}?setup=${this.getEnv()}`).subscribe((systemStatus) => {
        resolve(systemStatus as SystemStatus)
      })
    })
  } */
  getSystemStatusOberservable(): Observable<SystemStatus> {
    return new Observable((subscriber) => {
      this.httpClient.get(`${this.baseUrl}?setup=${this.getEnv()}`).subscribe((systemStatus) => {
        subscriber.next(systemStatus as SystemStatus)
      })
    })
  }
  hasError(status: SystemStatus): boolean {
    return (
      status.EHRBASE !== '' ||
      status.FE !== '' ||
      status.FHIR_BRIDGE !== '' ||
      status.KEYCLOAK !== '' ||
      status.NUM !== '' ||
      status.CHECK_FOR_ANNOUNCEMENTS !== ''
    )
  }
}
