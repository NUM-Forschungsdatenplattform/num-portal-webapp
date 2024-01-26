/**
 * Copyright 2024 Vitagroup AG
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
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { firstValueFrom, of } from 'rxjs'
import { attachmentContentMock1 } from 'src/mocks/data-mocks/attachment.mock'

import { AttachmentService } from './attachment.service'

describe('AttachmentService', () => {
  let service: AttachmentService

  const httpMockClient = {
    get: jest.fn(),
  } as unknown as HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpMockClient,
        },
      ],
    })
    service = TestBed.inject(AttachmentService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When downloading an attachment', () => {
    it('should return a blob representation of the file returned by backend', (done) => {
      jest.spyOn(httpMockClient, 'get').mockImplementation(() =>
        of(
          new HttpResponse({
            body: attachmentContentMock1,
            headers: new HttpHeaders({ 'content-disposition': 'attachment;filename=test.pdf' }),
            status: 200,
          })
        )
      )

      service.downloadAttachment(123).subscribe((fileBlob) => {
        expect(fileBlob).toBeInstanceOf(Blob)
        expect(fileBlob.type).toEqual('application/pdf')
        done()
      })
    })

    it('should throw error responses', async () => {
      const fileId = 234
      const notFoundResponse = new HttpErrorResponse({
        error: `File with id ${fileId} not found`,
        status: 404,
        statusText: 'NOT FOUND',
      })
      jest.spyOn(httpMockClient, 'get').mockImplementation(() => of(notFoundResponse))
      jest.spyOn(service, 'handleError')

      try {
        await firstValueFrom(service.downloadAttachment(fileId))
      } catch (error) {
        expect(service.handleError).toHaveBeenCalled()
      }
    })
  })
})
