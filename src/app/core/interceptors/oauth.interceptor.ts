import { Injectable } from '@angular/core'
import { OAuthStorage, OAuthService } from 'angular-oauth2-oidc'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
  excludedUrls = ['assets', '/assets']
  excludedUrlsRegEx = this.excludedUrls.map((url) => new RegExp('^' + url, 'i'))

  constructor(private oauthService: OAuthService, private authStorage: OAuthStorage) {}

  private isExcluded(req: HttpRequest<any>): boolean {
    return this.excludedUrlsRegEx.some((toBeExcluded) => toBeExcluded.test(req.url))
  }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isExcluded(req)) {
      return next.handle(req)
    }
    const token = this.authStorage.getItem('access_token')
    const headers = req.headers.set('Authorization', 'Bearer ' + token)
    req = req.clone({ headers })
    return next.handle(req).pipe(catchError(this.handleError.bind(this)))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.oauthService.logOut()
    }
    return throwError(error)
  }
}
