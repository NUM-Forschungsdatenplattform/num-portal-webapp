import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router'
import { of, throwError } from 'rxjs'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { mockPhenotype1 } from 'src/mocks/data-mocks/phenotypes.mock'
import { PhenotypeResolver } from './phenotype.resolver'

describe('PhenotypesResolver', () => {
  let resolver: PhenotypeResolver
  const state = {} as RouterStateSnapshot
  const phenotypeService = ({
    get: jest.fn(),
  } as unknown) as PhenotypeService

  beforeEach(() => {
    resolver = new PhenotypeResolver(phenotypeService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    it('should should return with an empty PhenotypeModel if the id was new', async () => {
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(result.error).toBeNull()
      expect(result.phenotype).toBeInstanceOf(PhenotypeUiModel)
      expect(result.phenotype.id).toEqual(0)
    })

    it('should provide an error message when the id was not "new" and not a number', async () => {
      const paramMap = convertToParamMap({ id: 'test' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.phenotype.id).toEqual(0)
    })

    it('should return the correct phenotype if the id is found', async () => {
      phenotypeService.get = jest.fn().mockImplementation(() => of(mockPhenotype1))
      const paramMap = convertToParamMap({ id: 1 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.phenotype.id).toEqual(1)
    })

    it('should return a new Phenotype and an error message if the id not found', async () => {
      phenotypeService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: 123 })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.phenotype.id).toEqual(0)
    })
  })
})
