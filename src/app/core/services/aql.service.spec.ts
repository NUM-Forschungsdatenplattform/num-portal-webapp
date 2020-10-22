import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppConfigService } from 'src/app/config/app-config.service';
import { IAql } from '../models/aql.interface';

import { AqlService } from './aql.service';

describe('AqlService', () => {
  let service: AqlService;

  const mockAqls: IAql[] = [
    {
      id: 1,
      name: 'name1',
      query: 'quer1'
    },
    {
      id: 2,
      name: 'name2',
      query: 'quer2'
    }
  ];

  const httpClient = ({
    get: () => of(mockAqls),
  } as unknown) as HttpClient;

  const appConfig = {
    config: {
      api: {
        baseUrl: 'localhost/api',
      },
    },
  } as AppConfigService;


  beforeEach(() => {
    service = new AqlService(httpClient, appConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When a call to getAll method comes in', () => {
    it('should calls the api - with success', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => of(mockAqls));
      service.getAll().subscribe();
      expect(httpClient.get).toHaveBeenCalled();
    });

    it('should calls the api - with error', () => {
      jest.spyOn(httpClient, 'get').mockImplementation(() => throwError('Error'));
      jest.spyOn(service, 'handleError');
      service.getAll().subscribe();
      expect(httpClient.get).toHaveBeenCalledWith('localhost/api/aql');
      expect(service.handleError).toHaveBeenCalled();
    });
  });
});
