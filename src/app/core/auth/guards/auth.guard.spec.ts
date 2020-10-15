import { KeycloakService } from 'keycloak-angular';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let keycloak = {

  } as KeycloakService;

  beforeEach(() => {
    guard = new AuthGuard(keycloak);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
