import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const keycloak = {
    isLoggedIn: () => Promise.resolve(true),
    login: () => {},
  } as KeycloakService;

  beforeEach(() => {
    guard = new AuthGuard(keycloak);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('When the user is logged in', () => {
    const activatedRoute = {} as ActivatedRouteSnapshot;
    const route = {} as Route;
    const state = {} as RouterStateSnapshot;

    it('grants access to the route in [canActivate] guard', () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(true);
      return guard.canActivate(activatedRoute, state).then((result) => {
        expect(result).toBeTruthy();
      });
    });

    it('grants access to the route in [canLoad] guard', async () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(true);
      const result = await guard.canLoad(route);
      expect(result).toBeTruthy();
    });
  });

  describe('When the user is not logged in', () => {
    const host = 'http://localhost';
    const path = 'test/url';
    const activatedRoute = {} as ActivatedRouteSnapshot;
    const route = { path } as Route;
    const state = {
      url: path,
    } as RouterStateSnapshot;

    it('calls keycloak.login to let the user login in [canActivate] guard', async () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(false);
      jest.spyOn(keycloak, 'login');

      const result = await guard.canActivate(activatedRoute, state);
      expect(keycloak.login).toHaveBeenCalledWith({
        redirectUri: host + state.url,
      });
    });

    it('calls keycloak.login to let the user login in [canLoad] guard', async () => {
      jest.spyOn(keycloak, 'isLoggedIn').mockResolvedValue(false);
      jest.spyOn(keycloak, 'login');

      const result = await guard.canLoad(route);
      expect(keycloak.login).toHaveBeenCalledWith({
        redirectUri: host + '/' + path,
      });
    });
  });
});
