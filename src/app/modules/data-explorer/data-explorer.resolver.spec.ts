import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { of, Subject, throwError } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { mockStudy2, mockStudy3 } from 'src/mocks/data-mocks/studies.mock'
import { DataExplorerResolver } from './data-explorer.resolver'

describe('Data Explorer Resolver', () => {
  let resolver: DataExplorerResolver
  const state = {} as RouterStateSnapshot

  const studyService = ({
    get: jest.fn(),
  } as unknown) as StudyService

  const phenotypeService = ({
    get: jest.fn(),
  } as unknown) as PhenotypeService

  const router = ({
    navigate: jest.fn(),
  } as unknown) as Router

  const userInfoSubject$ = new Subject<IAuthUserInfo>()
  const authService = {
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  beforeEach(() => {
    resolver = new DataExplorerResolver(studyService, phenotypeService, router, authService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    it('should provide an error message and navigate back to overview when the id was not a number', async () => {
      const paramMap = convertToParamMap({ id: 'test' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.study).toEqual(null)
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/studies'])
    })

    it('should return the correct study if the id is found, the study is published and the user is assigned as a reseracher', async () => {
      studyService.get = jest.fn().mockImplementation(() => of(mockStudy3))
      const mockUser = { sub: 'abc-1' }
      userInfoSubject$.next(mockUser)

      const paramMap = convertToParamMap({ id: 3 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.study.id).toEqual(3)
    })

    it('should provide an error message and navigate back to overview if the id is found and the study is not published', async () => {
      studyService.get = jest.fn().mockImplementation(() => of(mockStudy2))
      const mockUser = { sub: 'abc-1' }
      userInfoSubject$.next(mockUser)

      const paramMap = convertToParamMap({ id: 2 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.study).toEqual(null)
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/studies'])
    })

    it('should provide an error message and navigate back to overview if the id is found and the user is not assigned as a reseracher', async () => {
      studyService.get = jest.fn().mockImplementation(() => of(mockStudy3))
      const mockUser = { sub: 'abc-15' }
      userInfoSubject$.next(mockUser)

      const paramMap = convertToParamMap({ id: 3 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.study).toEqual(null)
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/studies'])
    })

    it('should return an error message and navigate back to overview if the id is not found', async () => {
      studyService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: 123 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result).toBe('Error')
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/studies'])
    })
  })
})
