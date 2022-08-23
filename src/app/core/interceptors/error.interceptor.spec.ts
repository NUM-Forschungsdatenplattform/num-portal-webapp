import { ErrorInterceptor } from './error.interceptor'
import { throwError } from 'rxjs'

describe('ErrorInterceptor', () => {
  let errorInterceptor
  let authenticationServiceSpy

  beforeEach(() => {
    authenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['logout'])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    errorInterceptor = new ErrorInterceptor(authenticationServiceSpy)
  })

  it('should create', () => {
    expect(errorInterceptor).toBeTruthy()
  })

  describe('intercept', () => {
    let httpRequestSpy
    let httpHandlerSpy

    it('should auto logout if 401 response returned from api', () => {
      //arrange
      httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter'])
      httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle'])
      httpHandlerSpy.handle.and.returnValue(throwError({ error: { message: 'test-error' } }))
      //act
      errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
        (result) => console.log('good', result),
        (err) => {
          console.log('error', err)
          expect(err).toEqual('test-error')
        }
      )
    })
  })
})
