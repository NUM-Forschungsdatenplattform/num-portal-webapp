import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

import { RoleGuard } from './role.guard';

describe('AuthGuardGuard', () => {
  let guard: RoleGuard;
  const keycloak = {
    isLoggedIn: () => Promise.resolve(true),
    getUserRoles: () => [],
    login: () => {},
  } as KeycloakService;

  beforeEach(() => {
    guard = new RoleGuard(keycloak);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('When the user is logged in and has required roles', () => {
    const activatedRoute = {
      data: {
        roles: ['All', 'required', 'roles']
      }
    } as unknown as ActivatedRouteSnapshot;

    const route = {
      data: {
        roles: ['All', 'required', 'roles']
      }
    } as Route;
    const state = {} as RouterStateSnapshot;

    it('grants access to the route in [canActivate] guard', () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(true);
      jest.spyOn(keycloak, 'getUserRoles').mockImplementation(() => ['user', 'has', 'required', 'role']);
      return guard.canActivate(activatedRoute, state).then((result) => {
        expect(result).toBeTruthy();
      });
    });

    it('grants access to the route in [canLoad] guard', async () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(true);
      jest.spyOn(keycloak, 'getUserRoles').mockImplementation(() => ['user', 'has', 'required', 'role']);
      const result = await guard.canLoad(route);
      expect(result).toBeTruthy();
    });
  });

  describe('When the user is logged in and has not the required roles', () => {
    const activatedRoute = {
      data: {
        roles: ['All', 'required', 'roles']
      }
    } as unknown as ActivatedRouteSnapshot;

    const route = {
      data: {
        roles: ['All', 'required', 'roles']
      }
    } as Route;
    const state = {} as RouterStateSnapshot;

    it('grants no access to the route in [canActivate] guard', () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(true);
      jest.spyOn(keycloak, 'getUserRoles').mockImplementation(() => ['user', 'has', 'no required', 'role']);
      return guard.canActivate(activatedRoute, state).then((result) => {
        expect(result).toBeFalsy();
      });
    });

    it('grants no access to the route in [canLoad] guard', async () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(true);
      jest.spyOn(keycloak, 'getUserRoles').mockImplementation(() => ['user', 'has', 'no required', 'role']);
      const result = await guard.canLoad(route);
      expect(result).toBeFalsy();
    });
  });

  describe('When the user is not logged in', () => {
    const host = 'http://localhost';
    const path = 'test/url';
    const activatedRoute = {
      data: {
        roles: []
      }
    } as unknown as ActivatedRouteSnapshot;

    const route = {
      path,
      data: {
        roles: []
      }
    } as Route;

    const state = {
      url: path,
    } as RouterStateSnapshot;

    it('calls keycloak.login to let the user login in [canActivate] guard', async () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(false);
      jest.spyOn(keycloak, 'login');
      jest.spyOn(keycloak, 'getUserRoles');

      const result = await guard.canActivate(activatedRoute, state);
      expect(keycloak.login).toHaveBeenCalledWith({
        redirectUri: host + state.url,
      });
    });

    it('calls keycloak.login to let the user login in [canLoad] guard', async () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(false);
      jest.spyOn(keycloak, 'login');
      jest.spyOn(keycloak, 'getUserRoles');

      const result = await guard.canLoad(route);
      expect(keycloak.login).toHaveBeenCalledWith({
        redirectUri: host + '/' + path,
      });
    });
  });
});
