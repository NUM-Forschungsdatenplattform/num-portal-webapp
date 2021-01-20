import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router'
import { of, throwError } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { mockStudy1 } from 'src/mocks/data-mocks/studies.mock'
import { StudyResolver } from './study.resolver'

describe('Study Resolver', () => {
  let resolver: StudyResolver
  const state = {} as RouterStateSnapshot

  const studyService = ({
    get: jest.fn(),
  } as unknown) as StudyService

  const phenotypeService = ({
    get: jest.fn(),
  } as unknown) as PhenotypeService

  beforeEach(() => {
    resolver = new StudyResolver(studyService, phenotypeService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    it('should should return with an empty StudyUiModel if the id was new', async () => {
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(result.error).toBeNull()
      expect(result.study).toBeInstanceOf(StudyUiModel)
      expect(result.study.id).toEqual(null)
    })

    it('should provide an error message when the id was not "new" and not a number', async () => {
      const paramMap = convertToParamMap({ id: 'test' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.study.id).toEqual(null)
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

    it('should return a new Study and an error message if the id is not found', async () => {
      studyService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: 123 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.study.id).toEqual(null)
    })
  })
})
