import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IUser } from 'src/app/shared/models/user/user.interface'

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string

  private unapprovedUsers: IUser[] = []
  private unapprovedUsersSubject$ = new BehaviorSubject(this.unapprovedUsers)
  public unapprovedUsersObservable$ = this.unapprovedUsersSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/admin`
  }

  private getUsers(approved: boolean): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(`${this.baseUrl}/user?approved=${approved}`)
      .pipe(catchError(this.handleError))
  }

  getUnapprovedUsers(): Observable<IUser[]> {
    return this.getUsers(false).pipe(
      tap((users) => {
        this.unapprovedUsers = users
        this.unapprovedUsersSubject$.next(users)
      })
    )
  }

  addUserRoles(userId: string, role: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      }),
      responseType: 'text' as 'json',
    }

    return this.httpClient
      .post<string>(`${this.baseUrl}/user/${userId}/role`, `"${role}"`, httpOptions)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
