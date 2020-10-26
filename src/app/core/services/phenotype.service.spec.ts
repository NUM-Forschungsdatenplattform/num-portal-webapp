import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AppConfigService } from 'src/app/config/app-config.service';
import { mockPhenotypes } from 'src/mocks/data-mocks/phenotypes.mock';

import { PhenotypeService } from './phenotype.service';

describe('PhenotypeService', () => {
  let service: PhenotypeService;

  const httpClient = ({
    get: () => of(mockPhenotypes),
  } as unknown) as HttpClient;

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService;

  beforeEach(() => {
    service = new PhenotypeService(httpClient, appConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When a call to getAll method comes in', () => {
    it('should call the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockPhenotypes));
      service.getAll().subscribe();
      expect(httpClient.get).toHaveBeenCalled();
    });

    it('should call the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'));
      jest.spyOn(service, 'handleError');
      service.getAll().subscribe();
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/phenotype');
      expect(service.handleError).toHaveBeenCalled();
    });
  });
});
