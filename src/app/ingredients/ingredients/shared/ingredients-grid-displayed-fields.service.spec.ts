import { TestBed } from '@angular/core/testing';

import { IngredientsGridDisplayedFieldsService } from './ingredients-grid-displayed-fields.service';

describe('IngredientsGridDisplayedFieldsService', () => {
  let service: IngredientsGridDisplayedFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsGridDisplayedFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
