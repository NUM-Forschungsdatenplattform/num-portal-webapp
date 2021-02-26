import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { of, throwError } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
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

  const mockRouter = ({
    navigate: jest.fn(),
  } as unknown) as Router

  beforeEach(() => {
    resolver = new StudyResolver(studyService, phenotypeService, mockRouter)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    it('should should return with an empty StudyUiModel if the id was new', async () => {
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(result.error).toBeNull()
      expect(result.study).toBeInstanceOf(StudyUiModel)
      expect(result.study.id).toEqual(null)
    })

    it('should provide an error message when the id was not "new" and not a number', async () => {
      const paramMap = convertToParamMap({ id: 'test' })
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.study.id).toEqual(null)
    })

    it('should return the correct study if the id is found', async () => {
      studyService.get = jest.fn().mockImplementation(() => of(mockStudy1))
      const paramMap = convertToParamMap({ id: 1 })
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.study.id).toEqual(1)
    })

    it('should navigate back to the study overview if the study is not found', async () => {
      jest.spyOn(mockRouter, 'navigate').mockImplementation()
      studyService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: 123 })
      const queryParamMap = convertToParamMap({ mode: 'edit' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot
      await resolver.resolve(activatedRoute, state).toPromise()
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/studies'])
    })

    it('should try to switch the status to in review if the mode is review', async () => {
      studyService.get = jest.fn().mockImplementation(() => of(mockStudy1))
      studyService.updateStatusById = jest.fn().mockImplementation()
      const paramMap = convertToParamMap({ id: 1 })
      const queryParamMap = convertToParamMap({ mode: 'review' })
      const activatedRoute = ({
        paramMap,
        queryParamMap,
      } as unknown) as ActivatedRouteSnapshot

      await resolver.resolve(activatedRoute, state).toPromise()
      expect(studyService.updateStatusById).toHaveBeenCalledWith(1, StudyStatus.Reviewing)
    })
  })
})
