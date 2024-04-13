import { TestBed } from '@angular/core/testing';

import { FoodstuffsGridDisplayedFieldsService } from './foodstuff-grid-displayed-fields.service';

describe('FoodstuffsGridDisplayedFieldsService', () => {
  let service: FoodstuffsGridDisplayedFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffsGridDisplayedFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
