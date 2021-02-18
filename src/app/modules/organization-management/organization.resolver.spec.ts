import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router'
import { of, throwError } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { OrganizationResolver } from './organization.resolver'

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver
  const state = {} as RouterStateSnapshot
  const organizationService = ({
    get: jest.fn(),
  } as unknown) as OrganizationService

  beforeEach(() => {
    resolver = new OrganizationResolver(organizationService)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    const mockOrganization1 = {
      id: '12345a',
      name: 'Organization A',
    }

    it('should return with undefined if the id was new', async () => {
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(result.error).toBeNull()
      expect(result.organization).toBeUndefined()
    })

    it('should return the correct organization if the id is found', async () => {
      organizationService.get = jest.fn().mockImplementation(() => of(mockOrganization1))
      const paramMap = convertToParamMap({ id: '12345a' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.organization.id).toEqual('12345a')
    })

    it('should return undefined and an error message if the id not found', async () => {
      organizationService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: '12345a' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(result.error).toBeDefined()
      expect(result.organization).toBeUndefined()
    })
  })
})
