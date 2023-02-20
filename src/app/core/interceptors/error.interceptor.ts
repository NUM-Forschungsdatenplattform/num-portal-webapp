import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service'
import { ProfileService } from '../services/profile/profile.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private profileService: ProfileService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logout()
        }
        if (err.status === 403) {
          this.profileService.setUnapproveUser(true)
        }

        const error = err.error.message || err.statusText
        return throwError(error)
      })
    )
  }
}
