import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { AppConfigService } from '../../../config/app-config.service'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { IUserProfile } from '../../../shared/models/user/user-profile.interface'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userProfile = {} as IUserProfile
  private userProfileSubject$ = new BehaviorSubject(this.userProfile)
  public userProfileObservable$ = this.userProfileSubject$.asObservable()

  constructor(private httpClient: HttpClient, private appConfig: AppConfigService) {}

  get baseUrl(): string {
    return `${this.appConfig.config.api.baseUrl}/profile`
  }

  get(): Observable<IUserProfile> {
    return this.httpClient.get<IUserProfile>(this.baseUrl).pipe(
      tap((userProfile) => {
        this.userProfile = userProfile
        this.userProfileSubject$.next(userProfile)
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
