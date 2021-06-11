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

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'
import { mockAqlCategories } from '../data-mocks/aql-categories.mock'

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  private mockAqlCategories = mockAqlCategories
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercept getAll AQL categories
    if (request.method === 'GET' && /aql\/category$/.test(request.url)) {
      return of(new HttpResponse({ status: 200, body: this.mockAqlCategories }))
    }

    // Intercept get for AQL category by id
    if (request.method === 'GET' && /aql\/category\/\d$/.test(request.url)) {
      const id = +request.url.substr(request.url.lastIndexOf('/') + 1)
      const result = this.mockAqlCategories.find((aqlCategory) => id === aqlCategory.id)
      if (result) {
        return of(new HttpResponse({ status: 200, body: result }))
      } else {
        return of(new HttpResponse({ status: 404 }))
      }
    }

    // Intercept post for new AQL category
    if (request.method === 'POST' && /aql\/category$/.test(request.url)) {
      const newCategory: IAqlCategoryApi = {
        id: this.mockAqlCategories.length + 1,
        name: request.body.name,
      }
      this.mockAqlCategories.push(newCategory)
      return of(new HttpResponse({ status: 201, body: newCategory }))
    }

    // Intercept put for update AQL category
    if (request.method === 'PUT' && /aql\/category\/\d$/.test(request.url)) {
      const id = +request.url.substr(request.url.lastIndexOf('/') + 1)
      const resultIdx = this.mockAqlCategories.findIndex((aqlCategory) => id === aqlCategory.id)
      if (resultIdx >= 0) {
        this.mockAqlCategories[resultIdx] = {
          ...this.mockAqlCategories[resultIdx],
          ...request.body,
        }
        return of(new HttpResponse({ status: 200, body: this.mockAqlCategories[resultIdx] }))
      } else {
        return of(new HttpResponse({ status: 404 }))
      }
    }

    // Intercept delete AQL category
    if (request.method === 'DELETE' && /aql\/category\/\d$/.test(request.url)) {
      const id = +request.url.substr(request.url.lastIndexOf('/') + 1)
      const resultIdx = this.mockAqlCategories.findIndex((aqlCategory) => id === aqlCategory.id)
      if (resultIdx >= 0) {
        this.mockAqlCategories.splice(resultIdx, 1)
        return of(new HttpResponse({ status: 204 }))
      } else {
        return of(new HttpResponse({ status: 404 }))
      }
    }

    // Let the request be handled by the backend if no intercept condition matches
    return next.handle(request)
  }
}
