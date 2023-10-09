import { TestBed } from '@angular/core/testing';

import { NumLibService } from './num-lib.service';

describe('NumLibService', () => {
  let service: NumLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
