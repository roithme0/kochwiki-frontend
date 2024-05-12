import { TestBed } from '@angular/core/testing';

import { RecipesGridHelperServiceService } from './recipes-grid-helper-service.service';

describe('RecipesGridHelperServiceService', () => {
  let service: RecipesGridHelperServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesGridHelperServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
