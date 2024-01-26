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
import { OAuthStorage, OAuthService } from 'angular-oauth2-oidc'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
  excludedUrls = ['assets', '/assets']
  excludedUrlsRegEx = this.excludedUrls.map((url) => new RegExp('^' + url, 'i'))

  constructor(
    private oauthService: OAuthService,
    private authStorage: OAuthStorage
  ) {}

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
    } else if (error.status === 409 && error.url.includes('/admin/user/')) {
      return of()
    }
    return throwError(error)
  }
}
