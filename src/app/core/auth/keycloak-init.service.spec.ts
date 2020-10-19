import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { of, throwError } from 'rxjs';
import { AppConfigService } from 'src/app/config/app-config.service';
import { KeycloakInitService } from './keycloak-init.service';

describe('Keycloak Init Service', () => {
  let initService: KeycloakInitService;

  const httpClient = ({
    get: () => of('what ever'),
  } as unknown) as HttpClient;

  const keycloak = {
    isLoggedIn: () => Promise.resolve(true),
    init: () => Promise.resolve(true),
    getUserRoles: () => [],
    login: () => {},
  } as KeycloakService;

  const appConfig = {
    config: {
      auth: {
        baseUrl: 'localhost',
        clientId: 'test-app',
        realm: 'test-realm',
      },
    },
  } as AppConfigService;

  beforeEach(() => {
    initService = new KeycloakInitService(httpClient, keycloak, appConfig);
  });

  it('should be created', () => {
    expect(initService).toBeTruthy();
  });

  describe('When keycloak gets initialized with success', () => {
    const keycloakConfig = {
      url: `${appConfig.config.auth.baseUrl}/auth`,
      realm: `${appConfig.config.auth.realm}`,
      clientId: `${appConfig.config.auth.clientId}`,
    };
    const initOptions = {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
    };

    it('Calls init on keycloak with correct config and options', async () => {
      jest.spyOn(keycloak, 'init');
      jest.spyOn(httpClient, 'get');

      await initService.initKeycloak(true);

      expect(keycloak.init).toHaveBeenCalledWith({
        config: keycloakConfig,
        initOptions,
      });
      expect(httpClient.get).not.toHaveBeenCalled();
    });
  });

  describe('When keycloak gets initialized with no success within more than 2 seconds', () => {
    const testUrl = `${appConfig.config.auth.baseUrl}/auth/realms/${appConfig.config.auth.realm}`;
    beforeEach(() => {
      jest.useFakeTimers();
    });
    it('Calls the test url and continues on success with init', async () => {
      jest.spyOn(httpClient, 'get');
      jest.spyOn(keycloak, 'init').mockImplementation(() => {
        jest.advanceTimersByTime(3_000);
        return Promise.resolve(true);
      });

      initService.initKeycloak(true).then((result) => {
        expect(result).toBeDefined();
      });
      expect(httpClient.get).toHaveBeenCalledWith(testUrl);
    });

    it('Calls the test url and fails on error', async () => {
      jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(throwError(new Error('Error')));
      jest.spyOn(keycloak, 'init').mockImplementation(() => {
        jest.advanceTimersByTime(3_000);
        return Promise.resolve(true);
      });

      initService.initKeycloak(true).catch((error) => {
        expect(error).toBeDefined();
      });
      expect(httpClient.get).toHaveBeenCalledWith(testUrl);
    });
  });

  describe('When keycloak gets initialized with no success within more than 20 seconds', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('fails', async () => {
      jest.spyOn(keycloak, 'init').mockImplementation(() => {
        jest.advanceTimersByTime(25_000);
        return Promise.resolve(true);
      });

      initService.initKeycloak(true).catch((error) => {
        expect(error).toBeDefined();
      });
    });
  });
});
