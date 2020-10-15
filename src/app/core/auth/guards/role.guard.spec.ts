import { KeycloakService } from 'keycloak-angular';

import { RoleGuard } from './role.guard';

describe('AuthGuardGuard', () => {
  let guard: RoleGuard;
  let keycloak = {

  } as KeycloakService;

  beforeEach(() => {
    guard = new RoleGuard(keycloak);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
