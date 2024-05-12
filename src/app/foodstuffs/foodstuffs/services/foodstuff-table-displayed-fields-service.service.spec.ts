import { TestBed } from '@angular/core/testing';

import { FoodstuffTableDisplayedFieldsServiceService } from './foodstuff-table-displayed-fields-service.service';

describe('FoodstuffTableDisplayedFieldsServiceService', () => {
  let service: FoodstuffTableDisplayedFieldsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffTableDisplayedFieldsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
