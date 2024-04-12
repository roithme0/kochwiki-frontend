import { TestBed } from '@angular/core/testing';

import { IngredientsGridDisplayedIngredientsService } from './ingredients-grid-displayed-ingredients.service';

describe('IngredientsGridService', () => {
  let service: IngredientsGridDisplayedIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsGridDisplayedIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
