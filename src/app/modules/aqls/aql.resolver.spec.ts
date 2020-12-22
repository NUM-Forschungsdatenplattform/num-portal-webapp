import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router'
import { of, throwError } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql.service'
import { AqlBuilderUiModel } from 'src/app/shared/models/aql/aql-builder-ui.model'
import { mockAql1 } from 'src/mocks/data-mocks/aqls.mock'
import { AqlResolver } from './aql.resolver'

describe('AqlsResolver', () => {
  let resolver: AqlResolver
  const state = {} as RouterStateSnapshot
  const aqlService = ({
    get: jest.fn(),
  } as unknown) as AqlService

  beforeEach(() => {
    resolver = new AqlResolver(aqlService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    it('should should return with an empty AqlBuilderUiModel if the id was new', async () => {
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(result.error).toBeNull()
      expect(result.aql).toBeInstanceOf(AqlBuilderUiModel)
      expect(result.aql.id).toEqual(0)
    })

    it('should provide an error message when the id was not "new" and not a number', async () => {
      const paramMap = convertToParamMap({ id: 'test' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.aql.id).toEqual(0)
    })

    it('should return the correct aql if the id is found', async () => {
      aqlService.get = jest.fn().mockImplementation(() => of(mockAql1))
      const paramMap = convertToParamMap({ id: 1 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.aql.id).toEqual(1)
    })

    it('should return a new Aql and an error message if the id not found', async () => {
      aqlService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: 123 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.aql.id).toEqual(0)
    })
  })
})
