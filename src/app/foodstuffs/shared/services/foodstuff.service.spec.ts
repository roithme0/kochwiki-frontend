import { TestBed } from '@angular/core/testing';

import { FoodstuffService } from './foodstuff.service';

describe('FoodstuffService', () => {
  let service: FoodstuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
