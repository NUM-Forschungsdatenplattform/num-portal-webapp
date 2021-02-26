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
      roles: ['SUPER_ADMIN', 'role-2'],
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
      roles: ['role-1', 'role-2'],
      approved: true,
      organization: mockOrganization1,
    }
    describe('When the id was new', () => {
      it('should return with undefined if the user has role super-admin', async (done) => {
        jest.useFakeTimers()
        const paramMap = convertToParamMap({ id: 'new' })
        const activatedRoute = ({
          paramMap,
        } as unknown) as ActivatedRouteSnapshot
        resolver
          .resolve(activatedRoute, state)
          .toPromise()
          .then((result) => {
            expect(result.error).toBeNull()
            expect(result.organization).toBeUndefined()
            done()
          })

        jest.advanceTimersByTime(1000)
        userProfileSubject$.next(mockUserProfile1)
      })

      it('should redirect to the editor with own organization if the user does not have role super-admin', async (done) => {
        jest.useFakeTimers()
        const paramMap = convertToParamMap({ id: 'new' })
        const activatedRoute = ({
          paramMap,
        } as unknown) as ActivatedRouteSnapshot
        resolver
          .resolve(activatedRoute, state)
          .toPromise()
          .then((result) => {
            expect(router.navigate).toHaveBeenCalledWith([
              'organizations',
              mockOrganization1.id,
              'editor',
            ])
            done()
          })

        jest.advanceTimersByTime(1000)
        userProfileSubject$.next(mockUserProfile2)
      })
    })
  })
})
