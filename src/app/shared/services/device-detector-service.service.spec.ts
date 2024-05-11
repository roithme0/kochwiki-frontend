import { TestBed } from '@angular/core/testing';

import { DeviceDetectorServiceService } from './device-detector-service.service';

describe('DeviceDetectorServiceService', () => {
  let service: DeviceDetectorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceDetectorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
