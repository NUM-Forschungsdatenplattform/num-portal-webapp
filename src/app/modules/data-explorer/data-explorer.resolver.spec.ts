import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { of, throwError } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { mockStudy1 } from 'src/mocks/data-mocks/studies.mock'
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

  let router = ({
    navigate: jest.fn(),
  } as unknown) as Router

  beforeEach(() => {
    resolver = new DataExplorerResolver(studyService, phenotypeService, router)
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

    it('should return the correct study if the id is found', async () => {
      studyService.get = jest.fn().mockImplementation(() => of(mockStudy1))
      const paramMap = convertToParamMap({ id: 1 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.study.id).toEqual(1)
    })

    it('should return an error message and navigate back to overview if the id is not found', async () => {
      studyService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: 123 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.study).toEqual(null)
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/studies'])
    })
  })
})
