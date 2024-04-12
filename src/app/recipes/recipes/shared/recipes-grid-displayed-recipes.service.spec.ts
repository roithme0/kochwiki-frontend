import { TestBed } from '@angular/core/testing';

import { RecipesGridDisplayedRecipesService } from './recipes-grid-displayed-recipes.service';

describe('RecipesGridDisplayedRecipesService', () => {
  let service: RecipesGridDisplayedRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesGridDisplayedRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
