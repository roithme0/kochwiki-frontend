import { TestBed } from '@angular/core/testing';

import { FoodstuffsGridControlsService } from './foodstuff-grid-controls.service';

describe('FoodstuffsGridControlsService', () => {
  let service: FoodstuffsGridControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffsGridControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
