import { Injectable } from '@angular/core'
import { OAuthStorage } from 'angular-oauth2-oidc'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
  excludedUrls = ['assets', '/assets']

  constructor(private authStorage: OAuthStorage) {}

  private isUrlExcluded(req: HttpRequest<any>, url: string): boolean {
    const regExp = new RegExp('^' + url, 'i')
    const urlTest = regExp.test(req.url)

    return urlTest
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let shallPass = this.excludedUrls.findIndex((item) => this.isUrlExcluded(req, item)) > -1

    if (shallPass) {
      return next.handle(req)
    }

    const token = this.authStorage.getItem('access_token')
    const headers = req.headers.set('Authorization', 'Bearer ' + token)

    req = req.clone({ headers })
    return next.handle(req)
  }
}
