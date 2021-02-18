import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { of, Subject, throwError } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { OrganizationResolver } from './organization.resolver'

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver
  const state = {} as RouterStateSnapshot
  const organizationService = ({
    get: jest.fn(),
  } as unknown) as OrganizationService

  const router = ({
    navigate: jest.fn(),
  } as unknown) as Router

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as ProfileService

  beforeEach(() => {
    resolver = new OrganizationResolver(organizationService, profileService, router)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  describe('When the resolve method is called', () => {
    const mockOrganization1 = {
      id: '12345a',
      name: 'Organization A',
    }

    const mockUserProfile1: IUserProfile = {
      id: '1',
      username: 'username-1',
      firstName: 'user1-firstname',
      lastName: 'user1-lastname',
      email: 'mockUser1@email.com',
      createdTimestamp: 1603140166809,
      roles: ['role-1', 'role-2'],
      approved: true,
      organization: mockOrganization1,
    }

    const mockUserProfile2: IUserProfile = {
      id: '1',
      username: 'username-1',
      firstName: 'user1-firstname',
      lastName: 'user1-lastname',
      email: 'mockUser1@email.com',
      createdTimestamp: 1603140166809,
      roles: ['ORGANIZATION_ADMIN', 'role-2'],
      approved: true,
      organization: mockOrganization1,
    }

    it('should return with undefined if the id was new and the user does not have role organization admin', async () => {
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      userProfileSubject$.next(mockUserProfile1)
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(result.error).toBeNull()
      expect(result.organization).toBeUndefined()
    })

    it('should redirect to organizationAdminsOrganizationId/editor if the id was new and the user does have role organization admin', async () => {
      const paramMap = convertToParamMap({ id: 'new' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      userProfileSubject$.next(mockUserProfile2)
      const result = await resolver.resolve(activatedRoute, state).toPromise()

      expect(router.navigate).toHaveBeenCalledWith([
        'organizations',
        mockOrganization1.id,
        'editor',
      ])
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

    it('should return an error and navigate to organizations if the id not found', async () => {
      organizationService.get = jest.fn().mockImplementation(() => throwError('Error'))
      const paramMap = convertToParamMap({ id: '12345a' })
      const activatedRoute = ({
        paramMap,
      } as unknown) as ActivatedRouteSnapshot
      const result = await resolver.resolve(activatedRoute, state).toPromise()
      expect(router.navigate).toHaveBeenCalledWith(['organizations'])
      expect(result).toBe('Error')
    })
  })
})
