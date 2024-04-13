import { TestBed } from '@angular/core/testing';

import { FoodstuffsGridDisplayedIngredientsService } from './foodstuff-grid-displayed-ingredients.service';

describe('IngredientsGridService', () => {
  let service: FoodstuffsGridDisplayedIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodstuffsGridDisplayedIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
