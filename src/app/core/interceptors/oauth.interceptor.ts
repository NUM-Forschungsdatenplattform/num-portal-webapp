import { Injectable } from '@angular/core'
import { OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { OAuthInitService } from '../auth/oauth-init.service'
import { catchError } from 'rxjs/operators'

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
  moduleConfig: OAuthModuleConfig

  constructor(private authStorage: OAuthStorage, private oauthInitService: OAuthInitService) {}

  private checkUrl(url: string): boolean {
    let found = this.moduleConfig.resourceServer.allowedUrls.find((u) => url.startsWith(u))
    return !!found
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url.toLowerCase()
    if (url.startsWith('assets') || url.startsWith('/assets')) return next.handle(req)

    this.moduleConfig = this.oauthInitService.initOAuthModule()

    if (!this.moduleConfig) return next.handle(req)
    if (!this.moduleConfig.resourceServer) return next.handle(req)
    if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(req)
    if (!this.checkUrl(url)) return next.handle(req)

    let sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken

    if (sendAccessToken) {
      let token = this.authStorage.getItem('access_token')
      let header = 'Bearer ' + token

      let headers = req.headers.set('Authorization', header)

      req = req.clone({ headers })
    }
    return next.handle(req).pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
