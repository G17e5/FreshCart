import { TestBed } from '@angular/core/testing';

import { ApisServicesService } from './apis-services.service';

describe('ApisServicesService', () => {
  let service: ApisServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
